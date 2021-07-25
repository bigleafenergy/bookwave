const sections = document.querySelectorAll("section");

//replace each image with image as sprite
sections.forEach((section) => {
  const originalPoster = section.querySelector("img");
  const originalPosterSource = originalPoster.getAttribute("src");

  section.innerHTML = "";

  //create a PIXI app
  let app = new PIXI.Application({
    width: 600,
    height: 800,
    transparent: true,
  });

  //Add the canvas that Pixi automatically created for you to the HTML document
  section.appendChild(app.view);

  //make a new loader
  const loader = new PIXI.loaders.Loader();

  // load the texture we need
  loader.add("poster", originalPosterSource);

  loader.load((loader, resources) => {
    // This creates a texture from a 'poster' image
    const poster = new PIXI.Sprite(resources.poster.texture);

    // Add the poster to the scene we are building
     app.stage.addChild(poster);
  });



  // app.loader.add('poster', 'poster1.jpg').load((loader, resources) => {
  //     // This creates a texture from a 'bunny.png' image
  //     const poster = new PIXI.Sprite(resources.poster.texture);

  //     // Setup the position of the bunny
  //     poster.x = app.renderer.width / 2;
  //     poster.y = app.renderer.height / 2;

  //     // Add the bunny to the scene we are building
  //     app.stage.addChild(poster);

  //     // Listen for frame updates
  //     app.ticker.add(() => {
  //          // each frame we spin the bunny around a bit
  //         poster.rotation += 0.01;
  //     });
  // });
});

// let poster = null
// let displacementImage = null

//   app.loader.add('poster', 'poster1.jpg').load((loader, resources) => {

//     // This creates a texture from a 'bunny.png' image
//     const poster = new PIXI.Sprite(resources.poster.texture);

//     //setup the position of the canvas

//     //add image to the app

//         app.stage.addChild(poster);

//     //Add the canvas that Pixi automatically created for you to the HTML document
//     section.appendChild(app.view);

//   });
