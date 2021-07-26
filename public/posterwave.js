const sections = document.querySelectorAll("section");

//replace each image with image as sprite
sections.forEach((section) => {
  const originalPoster = section.querySelector("img");
  const originalPosterSource = originalPoster.getAttribute("src");
  
  section.innerHTML = ""

  //create a PIXI app
  let app = new PIXI.Application({
    width: 500,
    height: 700,
    transparent: true,
  })

  //Add the canvas that Pixi automatically created for you to the HTML document
  section.appendChild(app.view)

  //make a new poster
  let poster = null
  let filter = null
  let rgbFilter = new PIXI.filters.RGBSplitFilter([10,0],[0,10],[0,0])

  //make a new loader
  const loader = new PIXI.loaders.Loader()


  // load the texture we need
  loader.add("poster", originalPosterSource)
  loader.add("displacement", "public/assets/displacement1.jpg")

  loader.load((loader, resources) => {
    // This creates a texture from a 'poster' image, once the image is loaded, now do things
    poster = new PIXI.Sprite(resources.poster.texture)
    filter = new PIXI.Sprite(resources.displacement.texture)

    
    poster.x = 250
    poster.y = 350
    poster.width = 400
    poster.height = 600
    poster.interactive = true



    poster.anchor.x = 0.5
    poster.anchor.y = 0.5
    
    filter.x = 0
    filter.y = 0

    filter.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT

    poster.filters = [
      new PIXI.filters.DisplacementFilter(filter, 20),
      rgbFilter
    ]

    // Add the poster to the scene we are building
    app.stage.addChild(poster)
    app.stage.addChild(filter)



     // Listen for frame updates
      app.ticker.add(() => {
           // each frame we move the filter a little
          filter.x += 1;
          filter.y += 1;
      });
  });


  let currentX = 0
  let aimX = 0
  let currentY = 0
  let aimY = 0

    //add event listener for mouse movement  
    section.addEventListener("mousemove", function(e){
      aimX = e.pageX
      aimY = e.pageY
    })

    const animate = function(){
      let diffX = aimX - currentX
      let diffY = aimY - currentY

      currentX = currentX + diffX * 0.05
      currentY = currentY + diffY * 0.05

      if(filter){
        filter.x += 1 + diffX* 0.05
        filter.y += 1 + diffY* 0.05


        rgbFilter.red = [diffX*0.05, 0]
        rgbFilter.green = [0, diffY*0.05]
      }

      requestAnimationFrame(animate)
    }

    animate()

});

