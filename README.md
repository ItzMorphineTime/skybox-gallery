# Skybox Gallery and Generator Tool

Skybox Gallery and Generator Tool is a feature-rich, web-based tool that generates and displays 360-degree projections of 2D textures onto a sphere or equorectangular mesh, known as Skyboxes. The tool uses Bootstrap and Handlebars to create a gallery of generated Skybox images and a modal popup to display each image in a 3D virtual environment using Three.js. The Skyboxes are generated using various algorithms and customizable parameters, and the tool uses the [Blockade Labs API](https://www.blockadelabs.com/) to generate and retrieve the images.

## Screenshots

Here are some screenshots of the Skybox Gallery and Generator Tool:

![Screenshot 1](/screenshots/SkyboxGallery.png)

- 3D

![Screenshot 2](/screenshots/SkyboxGallery3D.png)
![Screenshot 3](/screenshots/SkyboxGallery3D_2.png)

![Screenshot 4](/screenshots/SkyboxGallery3D_3.png)
![Screenshot 5](/screenshots/SkyboxGallery3D_4.png)

- Video
<video width="320" height="240" controls>
  <source src="https://itzmorphinetime.github.io/skybox-gallery/screenshots/Skybox Gallery Demo.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>
**Note:** Due to GitHub's security restrictions on embedded content, the video preview is not available directly in the repository. To view the video, please download it from the `/screenshots` folder or visit the live demo of the project.

https://itzmorphinetime.github.io/skybox-gallery/screenshots/Skybox%20Gallery%20Demo.mp4

## Features

- Generate Skyboxes using customizable parameters and algorithms.
- Remix Skyboxes using the ID/Seed of another image.
- Add Depth Textures to the generator with adjustable depth strength.
- Explore and view generated Skyboxes in a 3D virtual environment with improved controls.
- Search and filter Skyboxes by category, generator, status, and other parameters.
- View more details about each generated image.
- Use a Webhook URL to receive notifications when a Skybox is generated.
- Load an API key to access restricted functionality.
- Change the theme and style of the tool using the CSS tab.

## Usage

Firstly enter your own API KEY for blockade labs and click load. A message should pop up.

To generate a Skybox, navigate to the Generate tab and fill out the required and optional parameters. Click the "Generate" button, and the tool will generate a Skybox based on the given parameters. You can then view and explore the generated Skybox in the 3D virtual environment.

To remix a Skybox, enter the ID/Seed of an existing image into the Remix-Id aditional options and adjust the prompt as desired. Click the "Generate" button to generate a new Skybox based on the original image and the modified parameters.

To search for previously generated Skyboxes, navigate to the Search tab and use the available filters to find the desired Skyboxes. Click on a Skybox to view its details and explore it in the 3D virtual environment.

To change the theme and style of the tool, navigate to the CSS tab and select a theme from the dropdown.

## Technologies

Skybox Gallery and Generator Tool uses the following technologies:

- HTML
- CSS
- JavaScript
- jQuery
- Handlebars.js
- Three.js
- Bootstrap

## Credits

Skybox Gallery and Generator Tool was created by Joe Loe as a passion project. It was built using various open-source technologies and libraries, including Three.js, Handlebars.js, and Bootstrap. The tool uses the [Blockade Labs API](https://www.blockadelabs.com/) to generate and retrieve gallery images.
