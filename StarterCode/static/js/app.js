console.log('app.js loaded')

function InitDashboard () {
    console.log("InitDashboard()");
    // Populate the dropdown
    var selector = d3.select("#selDataset");
    d3.json("data/samples.json").then(function(data){
        console.log(data); 

        var sampleNames = data.names;
        
        sampleNames.forEach(sampleId => {
            selector.append("option")
                .text(sampleId)
                .property("value", sampleId);
        });
    });
    // Update the bargraph
    // Update the bubblechart
    // Update the demographic information
}

InitDashboard();
