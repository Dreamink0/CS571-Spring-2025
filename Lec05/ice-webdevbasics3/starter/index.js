// This is where your JS goes!

fetch('https://cs571.org/rest/s25/ice/chili', {
    headers: {
        "X-CS571-ID": CS571.getBadgerId() // You may hardcode your Badger ID instead.
    }
})
.then(res => {
    console.log(res.status, res.statusText);
    if(res.status === 200) {
        return res.json();
    } else {
        throw new Error();
    }
})
.then(data => {
    console.log(data);

    console.log("The 5-star reviews are...")
    console.log(data.reviews.filter(r => r.rating === 5).map(r => r.txt))

    console.log("The main instructions are...")
    console.log(data.recipe.map(inst => inst.split(":")[0]))

    console.log("The ingredients are...")
    console.log(Object.keys(data.ingredients))

    console.log("Is there some instruction to bake?")
    console.log(data.recipe.some(inst => inst.toLowerCase() === "bake"))

    console.log("What are the unique ingredient units?")
    console.log(Object.keys(data.ingredients).reduce((prev, curr) => {
        let currObj = data.ingredients[curr]
        let currUnit = currObj.unit

        if (!currUnit) {
            return prev
        }

        if (prev.includes(currUnit)) {
            return prev
        }

        prev.push(currUnit)
        return prev
    }, []))
})
// .catch(err => {
//     alert("Uh oh! Something went wrong. Are you logged in with your Badger ID?")
// })