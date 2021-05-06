// Some portions of the code are taken directly from the instructor's office hours tutorial.

// function to plot bar graph
function DrawBargraph(sampleId) {
    console.log(`DrawBargraph(${sampleId})`);

    d3.json("data/samples.json").then(data => {
        var samples = data.samples;
        var resultArray = samples.filter (s => s.id == sampleId);
        var result = resultArray[0];
        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;
        var sample_values = result.sample_values;

        yticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();

        var barData = {
            x: sample_values.slice(0,10).reverse(),
            y: yticks,
            type: "bar",
            text: otu_labels.slice(0,10).reverse(),
            orientation: "h"
        }

        var barArray = [barData];

        var barLayout = {
            title: "Top 10 Bacteria Cultures Found",
            margin: {t: 30, l: 150}
        }

        Plotly.newPlot("bar", barArray, barLayout);

    });
}

// function to plot bubble chart
function DrawBubblechart(sampleId) {
    console.log(`DrawBubblechart(${sampleId})`);

    d3.json("data/samples.json").then(data => {
        var samples = data.samples;
        var resultArray = samples.filter (s => s.id == sampleId);
        var result = resultArray[0];
        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;
        var sample_values = result.sample_values;

        var bubbleData = {
            x: otu_ids,
            y: sample_values,
            mode: 'markers',
            marker: {
                color: otu_ids,
                colorscale: 'Earth',
                size: sample_values
            },
            text: otu_labels
        }

        var bubbleArray = [bubbleData];

        var bubbleLayout = {
            showlegend: false,
            height: 600,
            width: 1000,
            xaxis: {title: "OTU ID"}
        }

        Plotly.newPlot("bubble", bubbleArray, bubbleLayout);
    });
}    

// function to show metadata
function ShowMetadata(sampleId) {
    console.log(`ShowMetadata(${sampleId})`);
    d3.json("data/samples.json").then(data => {
        console.log(data); 
        var metadata = data.metadata;
        var resultArray = metadata.filter (s => s.id == sampleId);
        var result = d3.select("#sample-metadata");
        result.html("");
        for (const [key, value] of Object.entries(resultArray[0])) {
            console.log(`${key}: ${value}`);
            result.append("p").text(`${key}: ${value}`)};               
    });

}

// function to draw gauge. Could not finish bonus part.
function DrawGauge(sampleId) {
    console.log(`DrawGauge(${sampleId})`);

    d3.json("data/samples.json").then(data => {
        var traceA = {
            type: "pie",
            showlegend: false,
            hole: 0.4,
            rotation: 90,
            values: [81/9, 81/9, 81/9, 81/9, 81/9, 81/9, 81/9, 81/9, 81/9, 81],
            text: ["0-1", "1-2", "2-3", "3-4", "4-5", "5-6", "6-7", "7-8", "8-9", ""],
            direction: "clockwise",
            textinfo: "text",
            textposition: "inside",
            marker: {
                colors: ['rgb(165,0,38)','rgb(215,48,39)','rgb(244,109,67)','rgb(253,174,97)','rgb(254,224,144)','rgb(224,243,248)','rgb(171,217,233)','rgb(116,173,209)','rgb(69,117,180)','white'],
            },
            labels: ["0-1", "1-2", "2-3", "3-4", "4-5", "5-6", "6-7", "7-8", "8-9", ""],
            hoverinfo: "label"
          };
          
          var degrees = 115, radius = .6;
          var radians = degrees * Math.PI / 180;
          var x = -1 * radius * Math.cos(radians);
          var y = radius * Math.sin(radians);
          
          var layout = {
            // shapes:[{
            //     type: 'line',
            //     x0: 0,
            //     y0: 0,
            //     x1: x,
            //     y1: 0.5,
            //     line: {
            //       color: 'black',
            //       width: 8
            //     }
            //   }],
            title: '<b>Belly Button Washing Frequency</b> <br> Scrubs per Week',
            xaxis: {visible: false, range: [-1, 1]},
            yaxis: {visible: false, range: [-1, 1]}
          };
          
          var data = [traceA];
          
          Plotly.plot("gauge", data, layout);



    });
} 

function optionChanged(newSampleId) {
    console.log(`User selected ${newSampleId}`);
    DrawBargraph(newSampleId);
    DrawBubblechart(newSampleId);
    ShowMetadata(newSampleId);
    DrawGauge(newSampleId);
}

function InitDashboard () {
    console.log("InitDashboard()");
    // Populate the dropdown
    var selector = d3.select("#selDataset");
    d3.json("data/samples.json").then(function(data){

        var sampleNames = data.names;
        
        sampleNames.forEach(sampleId => {
            selector.append("option")
                .text(sampleId)
                .property("value", sampleId);
        });

        var id = sampleNames[0];

        // Draw the graphs and metadata
        DrawBargraph(id);
        DrawBubblechart(id);
        ShowMetadata(id);
        DrawGauge(id);
    });
}

InitDashboard();
