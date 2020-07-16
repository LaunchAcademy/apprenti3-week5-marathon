Launch has commissioned your cohort to build our official ecommerce site.
Together, we'll use express, http, and handlebars to build a simple online store.

## Getting Started

```no-highlight
et get launch-store
cd launch-store
yarn install
yarn run dev
```

## User Stories

### Welcome Page

```no-highlight
As a potential customer
I want to be welcomed to the site
So that I'm encourage to purchase Launch schwag
```

Acceptance Criteria:

- When I navigate to the root page, I'm presented with a "Welcome Coder" headline
- I should also see the following paragraph "All the gear a Launcher Needs"
- The headline should be in Launch Academy blue

*Hint* - use a handlebars template - we'll want to modify this markup later.

Let's have someone:

1. Modify the endpoint in `src/app.js`
2. Add the view template
3. Add the stylesheet

### List Products

```no-highlight
As a potential customer on the root page
I want to see a list of products
So that I can consider purchasing them
```

Acceptance Criteria:

- I can see each product's name and price

Let's have someone:

1. Build out the function that loads the product from JSON
2. Update the `render` call to provide the view template with the appropriate context
3. Update the view template to list out each product's name and price

### List Only Featured Products

```no-highlight
As a potential customer on the root page
I only want to see a list of featured products
So that I'm encouraged to purchase the most popular products
```

Acceptance Criteria:

- I only see products that are set as featured
- I can't see products that are not featured

### Add a Product

```no-highlight
As a site admin
I want to add a new product to the store
So that I can improve the catalog
```

Acceptance Criteria:

- I can enter the product's name, description, and price

Let's have someone:

1. Build out the form that will allow us to add a new product
2. Build out the endpoint that results in the creation of the product

### Add a Featured Product

```no-highlight
As a site admin
I want to add a new product as featured
So that I can improve the catalog
```

Acceptance Criteria:

- I can designate a new product I'm creating as "featured"
- This product should show up on the home page

### Link to a Show Page

```no-highlight
As a site admin
I want to view the detail of a product
So that I can learn more about it
```

Acceptance Criteria:

- On the homepage, each product name is a link that I can follow to view more detail around the correlating product
- On the detail / show page, I can see the product name, description, and price
- On the detail / show page, there is a link to take me back to the home page

Let's have someone:

1. Modify the featured product listing to link to specific products
2. Build out the endpoint that supports the product detail screen
3. Build out the view template for the specific product
4. Add the link that takes the user back to the homepage

### Noncore: Validate an Added Product

```no-highlight
As a site admin
I want to be prompted to fix an error
So that I can fix the issue
```

Acceptance Criteria:

- If I fail to specify a product name or price, I'm presented with an error message, and the product is not saved
- If I fail to specify a product name or price but I have entered a description, the description should still appear on the page prompting me to fix my submission

Let's have someone:

1. Modify the `post` endpoint to re-render the form when validation fails
2. Update the view template to handle for the presence of an error
3. Update the view template to populate form field values if present - the group should ensure this does not break the original form.

### Noncore:  Delete an Added Product

```no-highlight
As a site admin
I can delete a product on its detail page
So that I can keep my catalog fresh
```

Acceptance Criteria:

- On the product detail / show page, there is a button to delete a product
- When the button is pressed, the product is no longer available on the root page or via its product detail / show page

Let's have someone:

1. Build the button to delete the product
2. Write the function that deletes a specific product from the JSON
3. Build the endpoint that processes the deletion
