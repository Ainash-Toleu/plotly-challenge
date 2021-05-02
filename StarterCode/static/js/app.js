// Portions of the code are taken directly from the instructor's office hours tutorial.

function DrawBargraph(sampleId) {
    console.log(`DrawBargraph(${sampleId})`);

    d3.json("data/samples.json").then(data => {
        // console.log(data); 
        var samples = data.samples;
        var resultArray = samples.filter (s => s.id == sampleId);
        // console.log(resultArray);
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

function DrawBubblechart(sampleId) {
    console.log(`DrawBubblechart(${sampleId})`);

    d3.json("data/samples.json").then(data => {
        // console.log(data); 
        var samples = data.samples;
        var resultArray = samples.filter (s => s.id == sampleId);
        // console.log(resultArray);
        var result = resultArray[0];
        var otu_ids = result.otu_ids;
        // console.log (otu_ids);
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
            title: "Each Sample Displayed",
            showlegend: false,
            height: 600,
            width: 1000
        }

        Plotly.newPlot("bubble", bubbleArray, bubbleLayout);
    });
}    

function ShowMetadata(sampleId) {
    console.log(`ShowMetadata(${sampleId})`);
    d3.json("data/samples.json").then(data => {
        console.log(data); 
        var metadata = data.metadata;
        var resultArray = metadata.filter (s => s.id == sampleId);
        
        for (const [key, value] of Object.entries(resultArray[0])) {
            console.log(`${key}: ${value}`)};
    });

}

function optionChanged(newSampleId) {
    console.log(`User selected ${newSampleId}`);
    DrawBargraph(newSampleId);
    DrawBubblechart(newSampleId);
    ShowMetadata(newSampleId);
}

function InitDashboard () {
    console.log("InitDashboard()");
    // Populate the dropdown
    var selector = d3.select("#selDataset");
    d3.json("data/samples.json").then(function(data){
        // console.log(data); 

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
    });
}

InitDashboard();
