import { Component, OnInit } from '@angular/core';
import { SpoonacularService } from '../spoonacular.service';
import { recipes } from 'src/app/recipe-list/recipe';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-recipe-list',
    templateUrl: './recipe-list.component.html',
    styleUrls: ['./recipe-list.component.css'],
    standalone: true,
    imports: [CommonModule, RouterModule]
})
export class RecipeListComponent implements OnInit {
    recipes: any[] = [];

    constructor() { }

    ngOnInit(): void {
        this.recipes = recipes;
    }
}
