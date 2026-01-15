import { Component, OnInit } from '@angular/core';
import { SpoonacularService } from '../spoonacular.service';
import { Recipe } from '../recipe-list/recipe';
import { Router } from '@angular/router';

@Component({
    selector: 'app-recipe-search',
    templateUrl: './recipe-search.component.html',
    styleUrls: ['./recipe-search.component.css'],
    standalone: false,
})
export class RecipeSearchComponent implements OnInit {
    recipes: Recipe[] = []; // List of recipes
    query: string = ''; // Search query
    recentRecipes: Recipe[] = [];
    filters = {
        veg: 'all',
        cuisine: 'all',
        time: 'all',
        difficulty: 'all'
    };
    popularSearches = [
        'Chicken Biryani',
        'Spaghetti Carbonara',
        'Tacos',
        'Margherita Pizza',
        'Fried Rice',
        'Tiramisu'
    ];

    constructor(
        private spoonacularService: SpoonacularService,
        private router: Router
    ) { }

    ngOnInit() {
        this.spoonacularService.getRecipes().subscribe((recipes) => {
            this.recipes = recipes;
            this.loadRecentRecipes();
        });
    }

    get filteredRecipes(): Recipe[] {
        const query = this.query.trim().toLowerCase();
        return this.recipes.filter((recipe) => {
            if (query) {
                const matchesQuery =
                    recipe.title.toLowerCase().includes(query) ||
                    recipe.summary.toLowerCase().includes(query);
                if (!matchesQuery) {
                    return false;
                }
            }

            const vegType = this.getVegType(recipe);
            if (this.filters.veg !== 'all' && this.filters.veg !== vegType) {
                return false;
            }

            const cuisine = this.getCuisine(recipe);
            if (this.filters.cuisine !== 'all' && this.filters.cuisine !== cuisine) {
                return false;
            }

            const time = this.getTimeBucket(recipe);
            if (this.filters.time !== 'all' && this.filters.time !== time) {
                return false;
            }

            const difficulty = this.getDifficulty(recipe);
            if (this.filters.difficulty !== 'all' && this.filters.difficulty !== difficulty) {
                return false;
            }

            return true;
        });
    }

    get suggestions(): Recipe[] {
        const query = this.query.trim().toLowerCase();
        if (!query) {
            return [];
        }
        return this.recipes
            .filter((recipe) => recipe.title.toLowerCase().includes(query))
            .slice(0, 6);
    }

    get previewRecipes(): Recipe[] {
        return this.filteredRecipes.slice(0, 8);
    }

    onSearchSubmit() {
        if (this.filteredRecipes.length === 1) {
            this.navigateToRecipe(this.filteredRecipes[0]);
        }
    }

    setFilter(type: 'veg' | 'cuisine' | 'time' | 'difficulty', value: string) {
        this.filters = { ...this.filters, [type]: value };
    }

    applyPopularSearch(term: string) {
        this.query = term;
    }

    navigateToRecipe(recipe: Recipe) {
        this.addRecentRecipe(recipe);
        this.router.navigate(['/recipes', recipe.id]);
    }

    private getVegType(recipe: Recipe): 'veg' | 'non-veg' {
        const title = recipe.title.toLowerCase();
        const nonVegKeywords = ['chicken', 'beef', 'shrimp', 'salmon'];
        return nonVegKeywords.some((word) => title.includes(word)) ? 'non-veg' : 'veg';
    }

    private getCuisine(recipe: Recipe): string {
        const title = recipe.title.toLowerCase();
        if (title.includes('biryani') || title.includes('curry')) return 'Indian';
        if (title.includes('carbonara') || title.includes('pizza') || title.includes('risotto') || title.includes('tiramisu') || title.includes('caprese') || title.includes('pasta') || title.includes('scampi')) return 'Italian';
        if (title.includes('tacos')) return 'Mexican';
        if (title.includes('fried rice')) return 'Chinese';
        if (title.includes('ratatouille')) return 'French';
        if (title.includes('burger') || title.includes('pancakes')) return 'American';
        return 'Other';
    }

    private getTimeBucket(recipe: Recipe): string {
        const title = recipe.title.toLowerCase();
        if (['salad', 'sandwich', 'pancakes', 'tacos', 'stir-fry', 'soup'].some((k) => title.includes(k))) {
            return 'quick';
        }
        if (['biryani', 'curry', 'ratatouille', 'tiramisu', 'risotto'].some((k) => title.includes(k))) {
            return 'slow';
        }
        return 'medium';
    }

    private getDifficulty(recipe: Recipe): string {
        const title = recipe.title.toLowerCase();
        if (['salad', 'soup', 'sandwich', 'pancakes'].some((k) => title.includes(k))) {
            return 'easy';
        }
        if (['biryani', 'risotto', 'tiramisu'].some((k) => title.includes(k))) {
            return 'hard';
        }
        return 'medium';
    }

    private loadRecentRecipes() {
        const raw = localStorage.getItem('recentRecipes');
        if (!raw) {
            this.recentRecipes = [];
            return;
        }
        try {
            const ids: number[] = JSON.parse(raw);
            this.recentRecipes = ids
                .map((id) => this.recipes.find((recipe) => recipe.id === id))
                .filter((recipe): recipe is Recipe => Boolean(recipe));
        } catch {
            this.recentRecipes = [];
        }
    }

    private addRecentRecipe(recipe: Recipe) {
        const ids = this.recentRecipes.map((item) => item.id);
        const next = [recipe.id, ...ids.filter((id) => id !== recipe.id)].slice(0, 6);
        localStorage.setItem('recentRecipes', JSON.stringify(next));
    }
}
