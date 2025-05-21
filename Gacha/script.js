const singleSummonBtn = document.querySelector("#singleSummonBtn");
const multiSummonBtn = document.querySelector("#multiSummonBtn");




const asteriteCount = document.querySelector("#asteriteCount");
const form = document.getElementById("inputForm");
let totalAsterites = 3200;
console.log(totalAsterites);
asteriteCount.textContent = totalAsterites;


form.addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission

    let userInput = document.getElementById("userInput").value;
    let convertedInput = parseInt(userInput);

    if (isNaN(convertedInput)) {
        alert("That's not a valid number!");
    } else {
        totalAsterites = convertedInput;
        alert("You entered the number: " + convertedInput);
        asteriteCount.textContent = totalAsterites;
    }
});




const pityCounter = document.querySelector("#pityCount");
const wonFiftyFifty = document.querySelector("#won5050");
const loseFiftyFifty = document.querySelector("#lose5050");
const copy = document.querySelector("#copy");
let pityCount = 0;
let lostFiftyFifty = false; // if true, next 5★ is guaranteed Zani
let won5050 = 0;
let lose5050 = 0;
let copyCounter = 0;


const gachaRates = {
    "5 Star": 1,   // 1% chance
    "4 Star": 10,  // 10% chance
    "3 Star": 89   // 89% chance
};


const characters = {
    "5 Star": [
        { name: "Zani", image: "images/Zani_Card.webp" },
        { name: "Verina", image: "images/Verina_Card.webp" },
        { name: "Lingyang", image: "images/Lingyang_Card.webp" },
        { name: "Calcharo", image: "images/Calcharo_Card.webp" },
        { name: "Jianxin", image: "images/Jianxin_Card.webp" },
        { name: "Encore", image: "images/Encore_Card.webp" },
    ],
    "4 Star": [
        { name: "Aalto", image: "images/Aalto_Card.webp" },
        { name: "Baizhi", image: "images/Baizhi_Card.webp" },
        { name: "Chixia", image: "images/Chixia_Card.webp" },
        { name: "Danjin", image: "images/Danjin_Card.webp" },
        { name: "Lumi", image: "images/Lumi_Card.webp" },
        { name: "Mortefi", image: "images/Mortefi_Card.webp" },
        { name: "Sanhua", image: "images/Sanhua_Card.webp" },
        { name: "Taoqi", image: "images/Taoqi_Card.webp" },
        { name: "Yangyang", image: "images/Yangyang_Card.webp" },
        { name: "Youhu", image: "images/Youhu_Card.webp" },
        { name: "Yuanwu", image: "images/Yuanwu_Card.webp" }
    ],
    "3 Star": [
        { name: "Pistol", image: "images/pistol.png" },
        { name: "Rectifier", image: "images/rectifier.png" },
        { name: "Sword", image: "images/sword.png" },
        { name: "Broadblade", image: "images/broadblade.png" },
        { name: "Gauntlet", image: "images/gauntlet.png" },
    ]
};


singleSummonBtn.addEventListener("click", () => {
    document.querySelector("#gachaScreen").style.display = "none";
    document.querySelector("#resultScreen").style.display = "flex";
    document.querySelector("#resultScreen").innerHTML = "";
    document.querySelector("#backBtn").style.display = "block";
    

    pityCount += 1;
    increaseChance();
    asteriteCounter(); 

    // Guarantee logic BEFORE pulling
    let rarity;
    if (pityCount % 10 === 0) {
        // Guaranteed 4 Star or higher
        let guaranteedRandom = Math.random() * 100;
        if (guaranteedRandom < 1) {
            rarity = "5 Star";
            pityCount = 0;
        } else {
            rarity = "4 Star";
        }

        resetRates(); // Reset to default rates
    } else {
        rarity = getRarity();
    }

    if (rarity === "5 Star") pityCount = 0;

    pityCounter.textContent = `Pity: ${pityCount}`;
    
            
    let character;
    if (rarity === "5 Star") {
        character = getFeaturedCharacter();
    } else {
        character = getRandomCharacter(rarity);
    } 
    summonCard(character);
    console.log(`You got a ${rarity} item!`);
});


multiSummonBtn.addEventListener("click", () => {
    document.querySelector("#gachaScreen").style.display = "none";
    document.querySelector("#resultScreen").style.display = "flex";
    document.querySelector("#resultScreen").innerHTML = "";
    document.querySelector("#backBtn").style.display = "block";

    let multiSummons = [];
    let found4StarOrHigher = false;

    for (let i = 0; i < 10; i++) {
        pityCount += 1;
        asteriteCounter();
        increaseChance();

        let rarity;

        // Check for forced guarantee every 10 pulls
        if (pityCount % 10 === 0) {
            let guaranteedRandom = Math.random() * 100;
            if (guaranteedRandom < 1) {
                rarity = "5 Star";
                pityCount = 0;
                resetRates();
            } else {
                rarity = "4 Star";
            }
            
        } else {
            rarity = getRarity();

            if (rarity === "5 Star") {
                pityCount = 0;
                resetRates();
            }
        }

        if (rarity === "5 Star" || rarity === "4 Star") {
            found4StarOrHigher = true;
        }

        let character;
        if (rarity === "5 Star") {
            character = getFeaturedCharacter();
        } else {
            character = getRandomCharacter(rarity);
        }

        multiSummons.push({ character, rarity });

        
    }

    pityCounter.textContent = `Pity: ${pityCount}`;

    // Ensure at least one 4★ or higher in the 10-pull
    if (!found4StarOrHigher) {
        let guaranteedChar = getRandomCharacter("4 Star");
        multiSummons[0] = { character: guaranteedChar, rarity: "4 Star" };
    }

    resetRates();

    multiSummons.forEach(({ character }) => {
        summonCard(character);
    });
});




// NEEDED FUNCTION FOR SUMMONING
function getRarity() {
    let random = Math.random() * 100;
    let cumulativeRate = 0;

    for (let rarity in gachaRates) {
        cumulativeRate += gachaRates[rarity];

        if (random < cumulativeRate) {
            return rarity;
        }
    };
}



function getRandomCharacter(rarity) {
    let characterList = characters[rarity];
    const randomIndex = Math.floor(Math.random() * characterList.length);  // random number for the range of character(3-5 Star) List
    return characterList[randomIndex];
}

function summonCard(charac) {
    const resultScreen = document.querySelector("#resultScreen");

    const card = document.createElement("div");
    card.className = "summonCard";

    // Add rarity-based glow
    if (characters["5 Star"].some(c => c.name === charac.name)) {
        card.classList.add("glow-5star");
    } else if (characters["4 Star"].some(c => c.name === charac.name)) {
        card.classList.add("glow-4star");
    }

    const img = document.createElement("img");
    img.src = charac.image;
    img.alt = charac.name;
    img.id = "character";

    card.appendChild(img);
    resultScreen.appendChild(card);
}


// BACK BUTTON
const backBtn = document.querySelector("#backBtn");

backBtn.addEventListener("click", ()=> {
    document.querySelector("#gachaScreen").style.display = "flex";
    document.querySelector("#resultScreen").style.display = "none";
    document.querySelector("#backBtn").style.display = "none";
    document.querySelector("#singleSummonBtn").style.display = "block";
    document.querySelector("#multiSummonBtn").style.display = "block";
});


function asteriteCounter() {
    totalAsterites -= 160;
    asteriteCount.textContent = totalAsterites;
}


function increaseChance() {
    if (pityCount === 80) {
        gachaRates["5 Star"] = 100;
        gachaRates["4 Star"] = 0;
        gachaRates["3 Star"] = 0;

    }else if (pityCount >= 66 && pityCount < 80) {
        const baseChance = 1;
        let addedChance = (pityCount - 65) * 6.6;
        gachaRates["5 Star"] = Math.min(baseChance + addedChance, 100);
        gachaRates["3 Star"] = 100 - gachaRates["5 Star"] - gachaRates["4 Star"];
    }
}

function resetRates() {
    gachaRates["5 Star"] = 1;
    gachaRates["4 Star"] = 10;
    gachaRates["3 Star"] = 89;
}

function getFeaturedCharacter() {
    const zani = characters["5 Star"].find(c => c.name === "Zani");

    if (lostFiftyFifty) {
        lostFiftyFifty = false;
        won5050 += 1;
        copyCounter += 1;
        wonFiftyFifty.textContent = `Won: ${won5050}`;
        copy.textContent = `Copy: ${copyCounter}`;
        return zani; // Guarantee Zani
    }

    // 50% chance to get Zani, 50% chance to get other 5★
    const isZani = Math.random() < 0.5;
    if (isZani) {
        won5050 += 1;
        copyCounter += 1;
        wonFiftyFifty.textContent = `Won: ${won5050}`;
        copy.textContent = `Copy: ${copyCounter}`;
        return zani;
    } else {
        // Filter out Zani and pick a random 5★
        const nonZani = characters["5 Star"].filter(c => c.name !== "Zani");
        const randomIndex = Math.floor(Math.random() * nonZani.length);
        lostFiftyFifty = true; // Set guarantee for next 5★
        lose5050 += 1;
        loseFiftyFifty.textContent = `Lose: ${lose5050}`;
        return nonZani[randomIndex];
    }
}