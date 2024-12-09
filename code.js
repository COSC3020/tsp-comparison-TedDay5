//Held Karp tsp code

function tsp_hk(distance_matrix) {
    let l = distance_matrix.length;

    if (l <= 1) {
        return 0;
    }
    let minimumTour = Infinity;

    for (let start = 0; start < l; start++){
        let cache = {};
        let cities = [];

        for(let i = 0; i < l; i++) {
            cities.push(i);
        }
        let tour = heldKarp(distance_matrix, cities, start, cache);

        if(tour < minimumTour) {
            minimumTour = tour;
        }
    }
    return minimumTour;
}

function heldKarp(distance_matrix, cities, start, cache) {
    let key = JSON.stringify([cities.slice().sort(), start]);

    if(cache[key] !== undefined) {
        return cache[key];
    }
    if(cities.length == 2) {
        let remaining = cities.find(c => c !== start);
        cache[key] = distance_matrix[start][remaining]
        return cache[key];
    }
    let minimumTour = Infinity;

    for(let city = 0; city < cities.length; city++) {
        if(cities[city] !== start) {
            let citiesSet = [];

            for(let newCity = 0; newCity < cities.length; newCity++) {
                if(cities[newCity] !== start) {
                    citiesSet.push(cities[newCity]);
                }
            }

            let tour = heldKarp(distance_matrix, citiesSet, cities[city], cache) + distance_matrix[start][cities[city]];

            if(tour < minimumTour) {
                minimumTour = tour;
            }
        }
    }
    cache[key] = minimumTour;
    return minimumTour;
}

//Local tsp code

function tsp_ls(distance_matrix) {
    if (distance_matrix <= 1) {
        return 0;
    }
    if (distance_matrix === 2) {
        return Math.min(distance_matrix[0][1], distance_matrix[1][0]);
    }

    var l = distance_matrix.length;
    var squence = [];
    var tmp;
    var minimum = Infinity;

    squence = squential_array(l);

    for(var i = 0; i < l; i++) {
        swap(squence, Math.floor(Math.random() * l), Math.floor(Math.random() * l))
    }

    let attempt = 0;
    let previous = null;
    let i_fixed = 0;
    let k_index = 2;

    while(attempt < (l ** 4)) {
        attempt++;
        tmp = distance(distance_matrix, squence);

        if(tmp < minimum) {
            minimum = tmp;
        }

        k_index = Math.floor(1 + Math.random() * (l - 1));

        if(previous === k_index) {
            if(k_index === 1) {
                k_index++;
            }
            else {
                k_index--;
            }
        }
        swap(squence, i_fixed, k_index);
        previous = k_index;
    }
    return minimum;
}

function swap(array, element1, element2) {
    var tmp = array[element1];
    array[element1] = array[element2];
    array[element2] = tmp;

    return;
}

function squential_array(i) {
    let sequence = [];

    for(var n = 0; n < i; n++) {
        sequence.push(n)
    }
    return sequence.slice(0,);
}

function distance(distance_matrix, squence) {
    var accumulator = 0;

    for(var j = 1; j < squence.length; j++) {
        accumulator += distance_matrix[squence[j - 1]][squence[j]]
    }
    return accumulator;
}

//test functions

function generateDistanceMatrix(size) {
    let matrix = Array.from({ length: size }, () => 
        Array.from({ length: size }, () => Math.floor(Math.random() * 100) + 1)
    );
    for (let i = 0; i < size; i++) {
        matrix[i][i] = 0;
    }
    return matrix;
}

function measureRuntime(algorithm, distanceMatrix) {
    let startTime = performance.now();
    let result = algorithm(distanceMatrix);
    let endTime = performance.now();
    return { time: endTime - startTime, result: result };
}

function calculateTourLength(distanceMatrix, tour) {
    let length = 0;
    for (let i = 0; i < tour.length - 1; i++) {
        length += distanceMatrix[tour[i]][tour[i + 1]];
    }
    length += distanceMatrix[tour[tour.length - 1]][tour[0]];
    console.log("Tour length", length);
    return length;
}

let sizes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];
let heldKarpTimes = [];
let localSearchTimes = [];

for (let size of sizes) {
    let matrix = generateDistanceMatrix(size);

    console.log("Map size:", size);

    heldKarpTimes.push(measureRuntime(tsp_hk, matrix));
    localSearchTimes.push(measureRuntime(tsp_ls, matrix));

    console.log("Held-Karp Times:", heldKarpTimes);
    console.log("Local Search Times:", localSearchTimes);
}
