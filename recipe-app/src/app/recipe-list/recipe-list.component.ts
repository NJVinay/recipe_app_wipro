import { Component, OnInit } from '@angular/core';
import { SpoonacularService } from '../spoonacular.service';
import { Recipe } from './recipe';

@Component({
    selector: 'app-recipe-list',
    templateUrl: './recipe-list.component.html',
    styleUrls: ['./recipe-list.component.css'],
    standalone: false,
})
export class RecipeListComponent implements OnInit {
    recipes: Recipe[] = [];

    constructor(private spoonacularService: SpoonacularService) { }

    ngOnInit(): void {
        this.spoonacularService.getRecipes().subscribe((recipes) => {
            this.recipes = recipes;
        });
    }
}
