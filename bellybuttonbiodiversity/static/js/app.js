function init() {
    // A dropdown select element for the Dataset
    var selector = d3.select("#selDataset");
  
    // Sample names used for the append("options")
    d3.json("samples.json").then((data) => {
  
      var sampleNames = data.names;
  
      sampleNames.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample);
      });
  
      // Use `sample_values` as the values for the bar chart.
      var firstSample = sampleNames[0];
      buildCharts(firstSample);
      buildMetadata(firstSample);
    });
  }
  
  // Initialize the dashboard
  init();
  
  function optionChanged(newSample) {
    // Fetch new data each time a new sample is selected
    buildMetadata(newSample);
    buildCharts(newSample);
    
  }
  
  // Demographics Panel 
  function buildMetadata(sample) {
    d3.json("samples.json").then((data) => {
      var metadata = data.metadata;
      // Filter the data for the object with the desired sample number
      var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
      var result = resultArray[0];
      // Use d3 to select the panel with id of `#sample-metadata`
      var PANEL = d3.select("#sample-metadata");
  
      // Use `.html("") to clear any existing metadata
      PANEL.html("");
  
      // Use `Object.entries` to add each key and value pair to the panel
      // Hint: Inside the loop, you will need to use d3 to append new
      // tags for each key-value in the metadata.
      Object.entries(result).forEach(([key, value]) => {
        PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
      });
  
    });
  }
  
  // Create the buildCharts function.
  function buildCharts(sample) {
    // Use d3.json to load and retrieve the samples.json file 
    d3.json("samples.json").then((data) => {
      console.log(data);
      // Create a variable that holds the samples array. 
      var samples = data.samples;
      // Create a variable that filters the samples for the object with the desired sample number.
      var resultsArray = samples.filter(obj => obj.id == sample);
      // Create a variable that holds the first sample in the array.
      var result = resultsArray[0];
      // Use `otu_ids` as the labels for the bar chart.
      // Use `otu_labels` as the hovertext for the chart.
      var otuIDs = result.otu_ids;
      var otuLabs = result.otu_labels;
      var sampleVals = result.sample_values; 
      // Create a variable that filters the metadata array 
      var metadata = data.metadata;
      var metadataArray = metadata.filter(sampleObj => sampleObj.id == sample);
      // Create a variable that holds the first sample in the metadata array
      var metaResult = metadataArray[0];
      // Create a variable that holds the washing frequency
      var washingFreq = parseInt(metaResult.wfreq);
  
      
    
    
      // Create the yticks for the bar chart.
      // Hint: Get the the top 10 otu_ids and map them in descending order  
      //  so the otu_ids with the most bacteria are last. 
  
      var yticks = otuIDs.slice(0,10).reverse().map(function (elem) {return `OTU ${elem}`});
      var xticks = sampleVals.slice(0,10).reverse();
      var labels = otuLabs.slice(0,10).reverse();
  
      // Create the trace for the bar chart. 
      var barData = {
        x: xticks,
        y: yticks,
        type: 'bar',
        orientation: 'h',
        text: labels
      };
      // Create the layout for the bar chart. 
      var barLayout = {
       title: "Top 10 Bacteria Cultures Found",
      };
      // Use Plotly to plot the data with the layout. 
      Plotly.newPlot("bar", [barData], barLayout);
  
      // Create the trace for the bubble chart.
      var bubbleData = {
        x: otuIDs,
        y: sampleVals,
        text: otuLabs,
        mode: 'markers',
        marker: {
          size: sampleVals,
          color: otuIDs
        }
      };
      
      // Create the layout for the bubble chart.
      var bubbleLayout = {
        title: "Bacteria Cultures Per Sample",
        xaxis: {title: "OTU ID"},
        showlegend: false
      };
      
      // Use Plotly to plot the data with the layout.
      Plotly.newPlot("bubble", [bubbleData], bubbleLayout);   
  
  
      // Gauge chart
      var gaugeData = {
        value: washingFreq,
        title: {text: "Belly Button Washing Frequency<br>Scrubs per Week"},
        type: "indicator",
        mode: "gauge+number",
        gauge: {
          axis: {range: [0,10]},
          steps: [
            {range: [0,2], color:"#"},
            {range: [2,4], color:"#c1f00f"},
            {range: [4,6], color:"#ee9c00"},
            {range: [6,8], color:"#eecc00"},
            {range: [8,10], color:"#d4ee00"}
          ]
        }
      };
  
      var gaugeLayout = {
        width: 600, height: 450, margin: {t: 0, b: 0}
      };
  
      Plotly.newPlot("gauge", [gaugeData], gaugeLayout);
  
    });
   };
  
  