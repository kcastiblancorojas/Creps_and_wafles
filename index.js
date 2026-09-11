function linearRegression(xArr, yArr) {
    var n = xArr.length;
    var sumX = 0;
    var sumY = 0;
    var sumXY = 0;
    var sumXX = 0;

    for (var i = 0; i < n; i++) {
        sumX += xArr[i];
        sumY += yArr[i];
        sumXY += xArr[i] * yArr[i];
        sumXX += xArr[i] * xArr[i];
    }

    var slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    var intercept = (sumY - slope * sumX) / n;

    return {
        slope: slope,
        intercept: intercept,
        predict: function (x) {
            return slope * x + intercept;
        }
    };
}

function parseCSV(text) {
    var lines = text.trim().split("\n").filter(function (line) {
        return line.trim() !== "";
    });

    var headers = lines[0].split(",").map(function (h) {
        return h.trim().replace(/\r/g, "");
    });

    var rows = [];
    for (var i = 1; i < lines.length; i++) {
        var cols = lines[i].split(",");
        var obj = {};

        for (var j = 0; j < headers.length; j++) {
            obj[headers[j]] = cols[j] ? cols[j].trim().replace(/\r/g, "") : "";
        }

        rows.push(obj);
    }

    return rows;
}

function buildChart(canvasId, xArr, yArr, xLabel, yLabel, model, xTickLabels) {
    var scatterData = [];
    for (var i = 0; i < xArr.length; i++) {
        scatterData.push({ x: xArr[i], y: yArr[i] });
    }

    var minX = Math.min.apply(null, xArr);
    var maxX = Math.max.apply(null, xArr);

    var regressionLine = [
        { x: minX, y: model.predict(minX) },
        { x: maxX, y: model.predict(maxX) }
    ];

    var ctx = document.getElementById(canvasId).getContext("2d");

    new Chart(ctx, {
        data: {
            datasets: [
                {
                    type: "scatter",
                    label: "Data Points",
                    data: scatterData,
                    backgroundColor: "rgba(172,147,89,0.4)",
                    pointRadius: 3
                },
                {
                    type: "line",
                    label: "Regression Line",
                    data: regressionLine,
                    borderColor: "rgba(220,53,69,0.9)",
                    borderWidth: 2,
                    pointRadius: 0,
                    fill: false
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { position: "top" }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: xLabel
                    },
                    ticks: xTickLabels ? {
                        callback: function (value) {
                            return xTickLabels[value] || value;
                        }
                    } : {}
                },
                y: {
                    title: {
                        display: true,
                        text: yLabel
                    }
                }
            }
        }
    });
}

fetch("Resume_food_order_3.csv")
    .then(function (response) {
        return response.text();
    })
    .then(function (csvText) {
        var rows = parseCSV(csvText);

        var validRatings = [];
        rows.forEach(function (row) {
            var r = parseFloat(row["rating"]);
            if (!isNaN(r)) {
                validRatings.push(r);
            }
        });

        var ratingSum = validRatings.reduce(function (acc, val) {
            return acc + val;
        }, 0);
        var ratingMean = ratingSum / validRatings.length;

        var xRating = [], yRating = [];
        rows.forEach(function (row) {
            var orderId = parseFloat(row["order_id"]);
            var rating = (row["rating"] === "Not given")
                ? ratingMean
                : parseFloat(row["rating"]);

            if (!isNaN(orderId) && !isNaN(rating)) {
                xRating.push(xRating.length);
                yRating.push(rating);
            }
        });

        var model1 = linearRegression(xRating, yRating);
        buildChart("chart1", xRating, yRating, "Order Index", "Rating (1–5)", model1);

        var pred1X = 500;
        var pred1Y = model1.predict(pred1X).toFixed(2);

        document.getElementById("pred1").innerHTML =
            "<strong>Prediction:</strong> For order index <span>" + pred1X + "</span>, "
            + "the predicted rating is <span>" + pred1Y + "</span>."
            + "<br>Regression formula: y = " + model1.slope.toFixed(4)
            + "x + " + model1.intercept.toFixed(2);

        var xPrep = [], yDelivery = [];
        rows.forEach(function (row) {
            var prep = parseFloat(row["food_preparation_time"]);
            var delivery = parseFloat(row["delivery_time"]);

            if (!isNaN(prep) && !isNaN(delivery)) {
                xPrep.push(prep);
                yDelivery.push(delivery);
            }
        });

        var model2 = linearRegression(xPrep, yDelivery);
        buildChart("chart2", xPrep, yDelivery, "Food Preparation Time (min)", "Delivery Time (min)", model2);

        var pred2X = 30;
        var pred2Y = model2.predict(pred2X).toFixed(2);

        document.getElementById("pred2").innerHTML =
            "<strong>Prediction:</strong> When food prep time is <span>" + pred2X + " min</span>, "
            + "predicted delivery time is <span>" + pred2Y + " min</span>."
            + "<br>Regression formula: y = " + model2.slope.toFixed(4)
            + "x + " + model2.intercept.toFixed(2);

        var restaurantMap = {};
        rows.forEach(function (row) {
            var name = row["restaurant_name"];
            var cost = parseFloat(row["cost_of_the_order"]);

            if (name && !isNaN(cost)) {
                if (!restaurantMap[name]) {
                    restaurantMap[name] = { total: 0, count: 0 };
                }
                restaurantMap[name].total += cost;
                restaurantMap[name].count += 1;
            }
        });

        var restaurantNames = Object.keys(restaurantMap);

        var avgCosts = restaurantNames.map(function (name) {
            return restaurantMap[name].total / restaurantMap[name].count;
        });

        var combined = restaurantNames.map(function (name, i) {
            return { name: name, avg: avgCosts[i] };
        });

        combined.sort(function (a, b) {
            return b.avg - a.avg;
        });

        combined = combined.slice(0, 20);

        var xRest = combined.map(function (_, i) { return i; });
        var yRest = combined.map(function (r) { return r.avg; });
        var labelMap = combined.map(function (r) { return r.name; });

        var model3 = linearRegression(xRest, yRest);
        buildChart("chart3", xRest, yRest, "Restaurant", "Avg Cost of Order ($)", model3, labelMap);

        var pred3X = 10;
        var pred3Y = model3.predict(pred3X).toFixed(2);

        document.getElementById("pred3").innerHTML =
            "<strong>Prediction:</strong> For restaurant at index <span>" + pred3X
            + " (" + (labelMap[pred3X] || "?") + ")</span>, "
            + "predicted average cost is <span>$" + pred3Y + "</span>."
            + "<br>Regression formula: y = " + model3.slope.toFixed(4)
            + "x + " + model3.intercept.toFixed(2);

        document.getElementById("loading-msg").style.display = "none";
        document.getElementById("charts-container").style.display = "block";
    })
    .catch(function (error) {
        document.getElementById("loading-msg").textContent =
            "Could not load CSV. Make sure Resume_food_order_3.csv is in the same folder as index.html.";
        console.error("CSV load error:", error);
    });

/* ── Weather ─────────────────────────────── */
var WEATHER_API_KEY = "a1fc0fb950c0b8ca380124ccdf5f66d7";
var WEATHER_CITY = "Toronto";
var WEATHER_UNITS = "metric";

var WEATHER_ICONS = {
    "01": "☀️",
    "02": "🌤",
    "03": "☁️",
    "04": "☁️",
    "09": "🌧",
    "10": "🌦",
    "11": "⛈",
    "13": "❄️",
    "50": "🌫",
};

function loadWeather() {
    var url = "https://api.openweathermap.org/data/2.5/weather"
        + "?q=" + WEATHER_CITY
        + "&units=" + WEATHER_UNITS
        + "&appid=" + WEATHER_API_KEY;

    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            if (data.cod !== 200) {
                showWeatherError("Weather unavailable: " + (data.message || data.cod));
                return;
            }

            var city = data.name;
            var temp = Math.round(data.main.temp);
            var description = data.weather[0].description;
            var iconCode = data.weather[0].icon;

            var iconKey = iconCode.substring(0, 2);
            var iconEmoji = WEATHER_ICONS[iconKey] || "🌡";

            document.getElementById("weather-city").textContent = city;
            document.getElementById("weather-temp").textContent = temp + "°C";
            document.getElementById("weather-desc").textContent = description;
            document.getElementById("weather-icon").textContent = iconEmoji;

            document.getElementById("weather-loading").style.display = "none";
            document.getElementById("weather-content").style.display = "block";
        })
        .catch(function (error) {
            showWeatherError("Could not load weather. Check your internet connection.");
            console.error("Weather fetch error:", error);
        });
}

function showWeatherError(msg) {
    document.getElementById("weather-loading").style.display = "none";
    document.getElementById("weather-error").style.display = "block";
    document.getElementById("weather-error").textContent = msg;
}

loadWeather();