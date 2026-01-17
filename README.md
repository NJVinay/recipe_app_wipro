# RecipeApp

**Live Demo:** https://njvinay.github.io/recipe_app_wipro/search  

Recipe Atlas is a static Angular app for browsing and searching recipes with rich detail pages.

## Tech stack

- Angular 19
- Bootstrap 5
- Static JSON data in `src/assets/recipes.json`

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## GitHub Pages deployment

This repo is configured to deploy to GitHub Pages via GitHub Actions on pushes to `main`.

Steps:
1) Push to `main`.
2) In GitHub Settings → Pages, set Source to **GitHub Actions**.
3) Your site will be available at `https://<username>.github.io/<repo-name>/`.

Notes:
- The workflow sets `--base-href "/<repo-name>/"` for proper routing.
- `404.html` is generated from `index.html` to support SPA routes.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
