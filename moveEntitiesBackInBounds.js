//Update all entities to within the scene bounds
(async ()=>{
    const { width, height, size } = canvas.dimensions;
    let entities = ["drawings", "tokens", "notes", "lighting", "templates", "sounds", "tiles"];
    for (let entity of entities) {
        await canvas[entity].updateAll(e=> {
            const { x, y } = e.data;
            return {
                x: Math.clamped(x, 10, width - size),
                y: Math.clamped(y, 10, height - size),
            };
        });
    }
    })();