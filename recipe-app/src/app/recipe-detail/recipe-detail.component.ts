import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpoonacularService } from '../spoonacular.service';
import { Recipe } from '../recipe-list/recipe';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
  standalone: false,
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe | undefined;

  constructor(
    private route: ActivatedRoute,
    private spoonacularService: SpoonacularService
  ) { }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? Number(idParam) : NaN;
    if (Number.isNaN(id)) {
      return;
    }

    this.spoonacularService.getRecipes().subscribe((recipes) => {
      this.recipe = recipes.find((recipe) => recipe.id === id);
    });
  }
}
