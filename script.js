// Update Slider Values and Risk Calculations
document.querySelectorAll("input[type='range']").forEach(slider => {
    slider.addEventListener("input", () => {
        const sliderValue = slider.nextElementSibling;
        sliderValue.innerText = slider.value; // Update displayed slider value
        updateRiskScore(); // Recalculate risk score dynamically
        updateRecommendations(); // Generate recommendations dynamically
        initializeRadarChart(); // Update radar chart dynamically
    });
});

// Dynamic Risk Calculations
function updateRiskScore() {
    const weights = {
        erosion: 0.15,
        vegetation: 0.15,
        waterQuality: 0.1,
        habitatDisruption: 0.1,
        airQuality: 0.1,
        noisePollution: 0.15,
        wasteManagement: 0.15,
        biodiversity: 0.05,
        carbonFootprint: 0.05,
    };

    const riskMetrics = [
        "erosion", "vegetation", "water-quality", "habitat-disruption", "air-quality",
        "noise-pollution", "waste-management", "biodiversity", "carbon-footprint"
    ];

    let totalRiskScore = 0;

    riskMetrics.forEach(metric => {
        const value = parseInt(document.getElementById(metric).value) * weights[metric];
        totalRiskScore += value;
    });

    const riskScoreElement = document.getElementById("risk-score");
    riskScoreElement.innerText = Math.round(totalRiskScore);

    const riskLevelElement = document.getElementById("risk-level");
    if (totalRiskScore <= 30) {
        riskLevelElement.innerText = "Low Risk";
        riskLevelElement.style.color = "green";
    } else if (totalRiskScore <= 60) {
        riskLevelElement.innerText = "Moderate Risk";
        riskLevelElement.style.color = "orange";
    } else {
        riskLevelElement.innerText = "High Risk";
        riskLevelElement.style.color = "red";
    }
}

// Recommendations Based on Risks
function updateRecommendations() {
    const recommendations = [];
    if (parseInt(document.getElementById("erosion").value) > 50) {
        recommendations.push("Implement erosion control measures such as sediment traps.");
    }
    if (parseInt(document.getElementById("vegetation").value) > 50) {
        recommendations.push("Revegetate damaged areas with native species.");
    }
    if (parseInt(document.getElementById("water-quality").value) > 50) {
        recommendations.push("Minimize sediment runoff using buffer zones.");
    }
    if (parseInt(document.getElementById("habitat-disruption").value) > 50) {
        recommendations.push("Preserve wildlife habitats and minimize disruptions.");
    }
    if (parseInt(document.getElementById("air-quality").value) > 50) {
        recommendations.push("Reduce emissions and control dust in sensitive areas.");
    }
    if (parseInt(document.getElementById("noise-pollution").value) > 50) {
        recommendations.push("Introduce noise barriers and schedule activities during off-peak hours.");
    }
    if (parseInt(document.getElementById("waste-management").value) > 50) {
        recommendations.push("Improve waste management practices, including recycling and waste minimization.");
    }
    if (parseInt(document.getElementById("biodiversity").value) < 50) {
        recommendations.push("Enhance biodiversity through habitat restoration and conservation programs.");
    }
    if (parseInt(document.getElementById("carbon-footprint").value) > 50) {
        recommendations.push("Adopt renewable energy sources and carbon offset measures.");
    }

    const recommendationsContainer = document.getElementById("recommendations");
    recommendationsContainer.innerHTML = recommendations.length
        ? `<ul>${recommendations.map(rec => `<li>${rec}</li>`).join("")}</ul>`
        : "No significant risks detected. Monitoring recommended.";
}

// Radar Chart Initialization
function initializeRadarChart() {
    const ctx = document.getElementById("impact-chart").getContext("2d");

    // Define the chart data
    const chartData = {
        labels: [
            "Erosion", "Vegetation", "Water Quality", "Habitat Disruption", "Air Quality",
            "Noise Pollution", "Waste Management", "Biodiversity", "Carbon Footprint"
        ],
        datasets: [
            {
                label: "Impact Levels",
                data: [
                    parseInt(document.getElementById("erosion").value),
                    parseInt(document.getElementById("vegetation").value),
                    parseInt(document.getElementById("water-quality").value),
                    parseInt(document.getElementById("habitat-disruption").value),
                    parseInt(document.getElementById("air-quality").value),
                    parseInt(document.getElementById("noise-pollution").value),
                    parseInt(document.getElementById("waste-management").value),
                    parseInt(document.getElementById("biodiversity").value),
                    parseInt(document.getElementById("carbon-footprint").value),
                ],
                backgroundColor: "rgba(44, 110, 73, 0.2)",
                borderColor: "rgba(44, 110, 73, 1)",
                borderWidth: 2,
                pointBackgroundColor: "rgba(44, 110, 73, 1)",
            },
        ],
    };

    // Define the chart configuration
    const radarChartConfig = {
        type: "radar",
        data: chartData,
        options: {
            responsive: true,
            scales: {
                r: {
                    suggestedMin: 0,
                    suggestedMax: 100,
                },
            },
        },
    };

    // Destroy the existing chart if it exists
    if (window.radarChart) {
        window.radarChart.destroy();
    }

    // Create a new chart instance
    window.radarChart = new Chart(ctx, radarChartConfig);
}

// Reinitialize Radar Chart on Page Load
document.addEventListener("DOMContentLoaded", () => {
    initializeRadarChart();
    updateRiskScore();
    updateRecommendations();
});
// Save Data to CSV
document.getElementById("save-local").addEventListener("click", () => {
    const headers = ["Field", "Value"];
    const data = [
        ["Project Name", document.getElementById("project-name").value || "N/A"],
        ["Location", document.getElementById("location").value || "N/A"],
        ["Assessor Name", document.getElementById("assessor-name").value || "N/A"],
        ["Date of Assessment", document.getElementById("date").value || "N/A"],
        ["Project Description", document.getElementById("project-description").value || "N/A"],
        ["Project Purpose", document.getElementById("project-purpose").value || "N/A"],
        ["Flora & Fauna", document.getElementById("flora-fauna").value || "N/A"],
        ["Soil Types", document.getElementById("soil-types").value || "N/A"],
        ["Waterways", document.getElementById("waterways").value || "N/A"],
        ["Distance to Sensitive Ecosystems", document.getElementById("ecosystems-distance").value || "N/A"],
        ["Distance to Critical Infrastructure", document.getElementById("infrastructure-distance").value || "N/A"],
        ["Land Use History", document.getElementById("land-use").value || "N/A"],
        ["Current Site Activities", document.getElementById("current-activities").value || "N/A"],
        ["Site Accessibility", document.getElementById("site-accessibility").value || "N/A"],
        ["Erosion Impact", document.getElementById("erosion").value || "0"],
        ["Vegetation Damage", document.getElementById("vegetation").value || "0"],
        ["Water Quality Impact", document.getElementById("water-quality").value || "0"],
        ["Habitat Disruption", document.getElementById("habitat-disruption").value || "0"],
        ["Air Quality Impact", document.getElementById("air-quality").value || "0"],
        ["Noise Pollution", document.getElementById("noise-pollution").value || "0"],
        ["Waste Management", document.getElementById("waste-management").value || "0"],
        ["Biodiversity Index", document.getElementById("biodiversity").value || "0"],
        ["Carbon Footprint", document.getElementById("carbon-footprint").value || "0"],
    ];

    const csvContent = [
        headers.join(","),
        ...data.map(row => row.join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "Assessment_Data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});

// Delete Data with Confirmation
document.getElementById("delete-data").addEventListener("click", () => {
    if (confirm("Are you sure you want to delete all data? This action cannot be undone.")) {
        document.querySelectorAll("form input, form textarea").forEach(input => input.value = "");
        document.querySelectorAll("input[type='range']").forEach(slider => slider.value = 0);
        updateRiskScore();
        updateRecommendations();
        initializeRadarChart();
        alert("All data has been cleared.");
    }
});

// Generate PDF Report
document.getElementById("generate-report").addEventListener("click", () => {
    const { jsPDF } = window.jspdf;

    // Prompt the user for a file name
    const pdfName = prompt("Enter the file name for your PDF:", "EIA_Report") || "";

    // Exit if the user cancels or leaves the input empty
    if (!pdfName.trim()) {
        alert("PDF generation canceled.");
        return;
    }

    try {
        const doc = new jsPDF();
        const headerColor = "#2a6f4b";
        const textColor = "#333";
        const sectionTitleFontSize = 14;
        const subHeadingFontSize = 12;
        const textFontSize = 12;
        const footerFontSize = 10;
        const margin = 10;
        const footerText = "Produced with Environmental Impact Assessment Tool by Jay Rowley";
        let yOffset = margin;

        const addPage = () => {
            doc.addPage();
            yOffset = margin;
        };

        const addFooter = (currentPage, totalPages) => {
            doc.setFontSize(footerFontSize);
            doc.setTextColor(textColor);
            doc.text(
                `${footerText} - Page ${currentPage} of ${totalPages}`,
                margin,
                doc.internal.pageSize.height - 10
            );
        };

        const addSectionTitle = (title) => {
            if (yOffset > 270) addPage();
            doc.setFontSize(sectionTitleFontSize);
            doc.setTextColor(headerColor);
            doc.text(title, margin, yOffset);
            yOffset += 10;
        };

        const addSubHeadingAndText = (subHeading, text) => {
            doc.setFontSize(subHeadingFontSize);
            doc.setTextColor(headerColor);
            if (yOffset > 270) addPage();
            doc.text(`${subHeading}:`, margin, yOffset);
            yOffset += 6;

            doc.setFontSize(textFontSize);
            doc.setTextColor(textColor);
            const splitText = doc.splitTextToSize(text, 180);
            splitText.forEach(line => {
                if (yOffset > 270) addPage();
                doc.text(line, margin, yOffset);
                yOffset += 6;
            });
            yOffset += 5;
        };

        // Add report heading
        doc.setFontSize(18);
        doc.setTextColor(headerColor);
        doc.text("Environmental Impact Assessment Report", margin, yOffset);
        yOffset += 15;

        // Project Details
        addSectionTitle("Project Details");
        addSubHeadingAndText("Project Name", document.getElementById("project-name").value || "N/A");
        addSubHeadingAndText("Location", document.getElementById("location").value || "N/A");
        addSubHeadingAndText("Assessor Name", document.getElementById("assessor-name").value || "N/A");
        addSubHeadingAndText("Date of Assessment", document.getElementById("date").value || "N/A");
        addSubHeadingAndText("Project Description", document.getElementById("project-description").value || "N/A");
        addSubHeadingAndText("Project Purpose", document.getElementById("project-purpose").value || "N/A");

        // Site Information
        addSectionTitle("Site Information");
        addSubHeadingAndText("Flora & Fauna", document.getElementById("flora-fauna").value || "N/A");
        addSubHeadingAndText("Soil Types", document.getElementById("soil-types").value || "N/A");
        addSubHeadingAndText("Waterways", document.getElementById("waterways").value || "N/A");
        addSubHeadingAndText("Distance to Sensitive Ecosystems", document.getElementById("ecosystems-distance").value || "N/A");
        addSubHeadingAndText("Distance to Critical Infrastructure", document.getElementById("infrastructure-distance").value || "N/A");
        addSubHeadingAndText("Land Use History", document.getElementById("land-use").value || "N/A");
        addSubHeadingAndText("Current Site Activities", document.getElementById("current-activities").value || "N/A");
        addSubHeadingAndText("Site Accessibility", document.getElementById("site-accessibility").value || "N/A");

        // Risk Assessment
        addSectionTitle("Risk Assessment");
        const riskMetrics = [
            { id: "erosion", label: "Erosion Impact" },
            { id: "vegetation", label: "Vegetation Damage" },
            { id: "water-quality", label: "Water Quality Impact" },
            { id: "habitat-disruption", label: "Habitat Disruption" },
            { id: "air-quality", label: "Air Quality Impact" },
            { id: "noise-pollution", label: "Noise Pollution" },
            { id: "waste-management", label: "Waste Management" },
            { id: "biodiversity", label: "Biodiversity Index" },
            { id: "carbon-footprint", label: "Carbon Footprint" }
        ];
        riskMetrics.forEach(metric => {
            addSubHeadingAndText(metric.label, document.getElementById(metric.id).value || "0");
        });

        // Recommendations
        addSectionTitle("Recommendations");
        const recommendationsElement = document.getElementById("recommendations");
        if (recommendationsElement) {
            const recommendationsHTML = recommendationsElement.innerHTML;
            const recommendationsText = recommendationsHTML.replace(/<[^>]*>?/gm, ''); // Remove HTML tags
            addSubHeadingAndText("Recommendations", recommendationsText);
        }

        // Budget Allocations
        addSectionTitle("Budget Allocations");
        const budgetAllocationsElement = document.getElementById("budget-allocations");
        if (budgetAllocationsElement) {
            const budgetAllocationsHTML = budgetAllocationsElement.innerHTML;
            const budgetAllocationsText = budgetAllocationsHTML.replace(/<[^>]*>?/gm, ''); // Remove HTML tags
            addSubHeadingAndText("Budget Allocations", budgetAllocationsText);
        }

        // Long-term Impact Projections
        addSectionTitle("Long-term Impact Projections");
        const projectionsElement = document.getElementById("long-term-projections");
        if (projectionsElement) {
            const projectionsHTML = projectionsElement.innerHTML;
            const projectionsText = projectionsHTML.replace(/<[^>]*>?/gm, ''); // Remove HTML tags
            addSubHeadingAndText("Long-term Impact Projections", projectionsText);
        }

        // Charts
        const chartCanvas = document.getElementById("impact-chart");
        if (chartCanvas) {
            const chartImage = chartCanvas.toDataURL("image/png");
            const chartWidth = 180;
            const chartHeight = (chartCanvas.height / chartCanvas.width) * chartWidth;
            if (yOffset + chartHeight > 270) addPage();
            doc.addImage(chartImage, "PNG", margin, yOffset, chartWidth, chartHeight);
            yOffset += chartHeight + 10;
        }

        const heatmapCanvas = document.getElementById("heatmap-canvas");
        if (heatmapCanvas) {
            const heatmapImage = heatmapCanvas.toDataURL("image/png");
            const heatmapWidth = 180;
            const heatmapHeight = (heatmapCanvas.height / heatmapCanvas.width) * heatmapWidth;
            if (yOffset + heatmapHeight > 270) addPage();
            doc.addImage(heatmapImage, "PNG", margin, yOffset, heatmapWidth, heatmapHeight);
            yOffset += heatmapHeight + 10;
        }

        const totalPages = doc.internal.getNumberOfPages();
        for (let i = 1; i <= totalPages; i++) {
            doc.setPage(i);
            addFooter(i, totalPages);
        }

        doc.save(`${pdfName}.pdf`);
    } catch (error) {
        alert("An error occurred during PDF generation: " + error.message);
        console.error(error);
    }
});

// Custom Heatmap Visualization (NEW FEATURE)
function initializeHeatmap() {
    const heatmapCanvas = document.getElementById("heatmap-canvas").getContext("2d");

    // Define the heatmap data
    const heatmapData = {
        labels: [
            "Erosion", "Vegetation", "Water Quality", "Habitat Disruption", "Air Quality",
            "Noise Pollution", "Waste Management", "Biodiversity", "Carbon Footprint"
        ],
        datasets: [{
            label: "Impact Levels",
            data: [
                parseInt(document.getElementById("erosion").value),
                parseInt(document.getElementById("vegetation").value),
                parseInt(document.getElementById("water-quality").value),
                parseInt(document.getElementById("habitat-disruption").value),
                parseInt(document.getElementById("air-quality").value),
                parseInt(document.getElementById("noise-pollution").value),
                parseInt(document.getElementById("waste-management").value),
                parseInt(document.getElementById("biodiversity").value),
                parseInt(document.getElementById("carbon-footprint").value),
            ],
            backgroundColor: function(context) {
                const value = context.dataset.data[context.dataIndex];
                return value > 70
                    ? "rgba(200, 79, 67, 0.8)" // High (Red)
                    : value > 40
                        ? "rgba(240, 199, 94, 0.8)" // Moderate (Orange)
                        : "rgba(107, 165, 131, 0.8)"; // Low (Green)
            },
            borderWidth: 1,
        }]
    };

    // Heatmap configuration
    const heatmapConfig = {
        type: "bar",
        data: heatmapData,
        options: {
            responsive: true,
            indexAxis: "y", // Horizontal bar chart
            scales: {
                x: {
                    suggestedMin: 0,
                    suggestedMax: 100,
                },
            },
        },
    };

    // Destroy existing heatmap if it exists
    if (window.heatmapChart) {
        window.heatmapChart.destroy();
    }

    // Create new heatmap instance
    window.heatmapChart = new Chart(heatmapCanvas, heatmapConfig);
}

// Initialize Heatmap on Page Load
document.addEventListener("DOMContentLoaded", () => {
    initializeHeatmap();
});

// Timeline Visualization (NEW FEATURE)
function initializeTimeline() {
    const timelineContainer = document.getElementById("timeline-container");
    timelineContainer.innerHTML = ""; // Clear existing timeline

    const milestones = [
        { milestone: "Assessment Start", date: document.getElementById("date").value || "N/A" },
        { milestone: "Mitigation Measures Planned", date: "TBD" },
        { milestone: "Project Completion Estimated", date: "TBD" },
    ];

    milestones.forEach(({ milestone, date }) => {
        const milestoneElement = document.createElement("div");
        milestoneElement.className = "timeline-item";
        milestoneElement.innerHTML = `
            <h4>${milestone}</h4>
            <p>${date}</p>
        `;
        timelineContainer.appendChild(milestoneElement);
    });
}

// Initialize Timeline on Page Load
document.addEventListener("DOMContentLoaded", () => {
    initializeTimeline();
});
// Mitigation Measures Section (NEW FEATURE)
function populateMitigationMeasures() {
    const mitigationContainer = document.getElementById("mitigation-measures");
    mitigationContainer.innerHTML = ""; // Clear any existing content

    const measures = [
        { category: "Erosion Control", description: "Install sediment traps, silt fences, and check dams." },
        { category: "Revegetation", description: "Replant native vegetation in degraded areas." },
        { category: "Water Quality", description: "Establish riparian buffer zones to reduce runoff." },
        { category: "Biodiversity", description: "Implement wildlife corridors and habitat restoration projects." },
        { category: "Carbon Reduction", description: "Adopt renewable energy sources and reduce emissions." }
    ];

    measures.forEach(measure => {
        const measureElement = document.createElement("div");
        measureElement.className = "mitigation-item";
        measureElement.innerHTML = `
            <h4>${measure.category}</h4>
            <p>${measure.description}</p>
        `;
        mitigationContainer.appendChild(measureElement);
    });
}

// Initialize Mitigation Measures on Page Load
document.addEventListener("DOMContentLoaded", () => {
    populateMitigationMeasures();
});

// Advanced Recommendations System (Improved Feature)
function rankRecommendationsByUrgency() {
    const rankedRecommendations = [];
    const metrics = [
        { id: "erosion", weight: 1.0, message: "Prioritize erosion control measures immediately." },
        { id: "vegetation", weight: 0.9, message: "Revegetate to stabilize soil and improve ecosystem health." },
        { id: "water-quality", weight: 0.8, message: "Focus on protecting water bodies from contamination." },
        { id: "noise-pollution", weight: 0.7, message: "Install noise barriers in high-impact areas." },
        { id: "biodiversity", weight: 0.6, message: "Preserve and enhance biodiversity on-site." }
    ];

    metrics.forEach(metric => {
        const value = parseInt(document.getElementById(metric.id).value);
        if (value > 50) {
            rankedRecommendations.push({ message: metric.message, urgency: metric.weight * value });
        }
    });

    // Sort by urgency descending
    rankedRecommendations.sort((a, b) => b.urgency - a.urgency);

    const recommendationsContainer = document.getElementById("recommendations");
    recommendationsContainer.innerHTML = rankedRecommendations.length
        ? `<ol>${rankedRecommendations.map(rec => `<li>${rec.message}</li>`).join("")}</ol>`
        : "No urgent actions required. Continue monitoring.";
}

// Update recommendations dynamically
document.querySelectorAll("input[type='range']").forEach(slider => {
    slider.addEventListener("input", () => {
        rankRecommendationsByUrgency();
    });
});

// Track User Progress (NEW FEATURE)
function trackProgress() {
    const progressContainer = document.getElementById("progress-tracker");
    const totalMetrics = 9; // Total number of sliders
    const completed = Array.from(document.querySelectorAll("input[type='range']"))
        .filter(slider => parseInt(slider.value) > 0).length;

    const progress = Math.round((completed / totalMetrics) * 100);
    progressContainer.innerText = `Progress: ${progress}% completed`;

    // Change color based on progress
    progressContainer.style.color = progress === 100 ? "green" : progress > 50 ? "orange" : "red";
}

// Monitor progress updates dynamically
document.querySelectorAll("input[type='range']").forEach(slider => {
    slider.addEventListener("input", trackProgress);
});

// Initialize Progress Tracker on Page Load
document.addEventListener("DOMContentLoaded", () => {
    trackProgress();
});
// Long-term Impact Projections (NEW FEATURE)
function calculateLongTermProjections() {
    const projectionContainer = document.getElementById("long-term-projections");
    projectionContainer.innerHTML = ""; // Clear existing content

    const riskMetrics = [
        { id: "erosion", label: "Erosion Impact" },
        { id: "vegetation", label: "Vegetation Damage" },
        { id: "water-quality", label: "Water Quality Impact" },
        { id: "habitat-disruption", label: "Habitat Disruption" },
        { id: "air-quality", label: "Air Quality Impact" },
        { id: "noise-pollution", label: "Noise Pollution" },
        { id: "waste-management", label: "Waste Management" },
        { id: "biodiversity", label: "Biodiversity Index" },
        { id: "carbon-footprint", label: "Carbon Footprint" }
    ];

    const years = [10, 20, 50]; // Time intervals for projections
    const projectionFactor = 1.1; // Assumes a 10% annual increase in risk without mitigation

    riskMetrics.forEach(metric => {
        const baseValue = parseInt(document.getElementById(metric.id).value);

        const projections = years.map(year => {
            const projectedValue = Math.min(100, Math.round(baseValue * Math.pow(projectionFactor, year / 10)));
            return `<li><strong>${year} years:</strong> ${projectedValue}</li>`;
        });

        const metricElement = document.createElement("div");
        metricElement.className = "projection-item";
        metricElement.innerHTML = `
            <h4>${metric.label}</h4>
            <ul>${projections.join("")}</ul>
        `;

        projectionContainer.appendChild(metricElement);
    });
}

// Initialize Long-term Impact Projections on Page Load
document.addEventListener("DOMContentLoaded", () => {
    calculateLongTermProjections();
});

// Update projections dynamically
document.querySelectorAll("input[type='range']").forEach(slider => {
    slider.addEventListener("input", calculateLongTermProjections);
});

// Policy Compliance Checklist (NEW FEATURE)
function generatePolicyComplianceChecklist() {
    const checklistContainer = document.getElementById("policy-compliance-checklist");
    checklistContainer.innerHTML = ""; // Clear existing content

    const policies = [
        { name: "Water Protection Act Compliance", met: true },
        { name: "Biodiversity Preservation Standards", met: false },
        { name: "Air Quality Regulations", met: true },
        { name: "Waste Management Guidelines", met: false },
        { name: "Carbon Emission Reduction Targets", met: true }
    ];

    policies.forEach(policy => {
        const policyElement = document.createElement("div");
        policyElement.className = "policy-item";
        policyElement.innerHTML = `
            <p>
                <strong>${policy.name}:</strong> 
                <span style="color: ${policy.met ? "green" : "red"};">
                    ${policy.met ? "Met" : "Unmet"}
                </span>
            </p>
        `;
        checklistContainer.appendChild(policyElement);
    });
}

// Initialize Policy Compliance Checklist on Page Load
document.addEventListener("DOMContentLoaded", () => {
    generatePolicyComplianceChecklist();
});

// Real-time Dynamic Chart Updates
function updateAllCharts() {
    initializeRadarChart();
    initializeHeatmap();
}

// Trigger chart updates dynamically
document.querySelectorAll("input[type='range']").forEach(slider => {
    slider.addEventListener("input", updateAllCharts);
});

// Budget Allocation and Cost Tracking (NEW FEATURE)
function calculateBudgetAllocations() {
    const budgetContainer = document.getElementById("budget-allocations");
    budgetContainer.innerHTML = ""; // Clear any existing content

    const allocations = [
        { category: "Erosion Control", inputId: "erosion", costPerUnit: 100 },
        { category: "Revegetation", inputId: "vegetation", costPerUnit: 200 },
        { category: "Water Quality", inputId: "water-quality", costPerUnit: 150 },
        { category: "Noise Pollution", inputId: "noise-pollution", costPerUnit: 80 },
        { category: "Waste Management", inputId: "waste-management", costPerUnit: 120 }
    ];

    let totalCost = 0;

    allocations.forEach(allocation => {
        const value = parseInt(document.getElementById(allocation.inputId).value);
        const cost = value * allocation.costPerUnit;

        const allocationElement = document.createElement("div");
        allocationElement.className = "budget-item";
        allocationElement.innerHTML = `
            <p><strong>${allocation.category}:</strong> $${cost.toLocaleString()}</p>
        `;

        budgetContainer.appendChild(allocationElement);
        totalCost += cost;// Generate PDF Report
    });

    const totalElement = document.createElement("div");
    totalElement.className = "budget-total";
    totalElement.innerHTML = `
        <h4>Total Estimated Cost:</h4>
        <p><strong>$${totalCost.toLocaleString()}</strong></p>
    `;

    budgetContainer.appendChild(totalElement);
}

// Initialize Budget Allocations on Page Load
document.addEventListener("DOMContentLoaded", () => {
    calculateBudgetAllocations();
});

// Update budget allocations dynamically
document.querySelectorAll("input[type='range']").forEach(slider => {
    slider.addEventListener("input", calculateBudgetAllocations);
});

// Dynamic Stakeholder Involvement Tracker (NEW FEATURE)
function trackStakeholderInvolvement() {
    const stakeholderContainer = document.getElementById("stakeholder-tracker");
    stakeholderContainer.innerHTML = ""; // Clear existing content

    const stakeholders = [
        { role: "Project Manager", status: "Confirmed", color: "green" },
        { role: "Environmental Consultant", status: "Pending", color: "orange" },
        { role: "Community Representative", status: "Confirmed", color: "green" },
        { role: "Regulatory Advisor", status: "Pending", color: "orange" }
    ];

    stakeholders.forEach(stakeholder => {
        const stakeholderElement = document.createElement("div");
        stakeholderElement.className = "stakeholder-item";
        stakeholderElement.innerHTML = `
            <p>
                <strong>${stakeholder.role}:</strong> 
                <span style="color: ${stakeholder.color};">${stakeholder.status}</span>
            </p>
        `;

        stakeholderContainer.appendChild(stakeholderElement);
    });
}

// Initialize Stakeholder Tracker on Page Load
document.addEventListener("DOMContentLoaded", () => {
    trackStakeholderInvolvement();
});

// Real-time Risk Comparison Feature (NEW FEATURE)
function compareCurrentVsPreviousAssessment() {
    const comparisonContainer = document.getElementById("risk-comparison");
    comparisonContainer.innerHTML = ""; // Clear existing content

    const metrics = [
        { id: "erosion", label: "Erosion Impact", previousValue: 30 },
        { id: "vegetation", label: "Vegetation Damage", previousValue: 40 },
        { id: "water-quality", label: "Water Quality Impact", previousValue: 50 },
        { id: "habitat-disruption", label: "Habitat Disruption", previousValue: 20 },
        { id: "air-quality", label: "Air Quality Impact", previousValue: 35 }
    ];

    metrics.forEach(metric => {
        const currentValue = parseInt(document.getElementById(metric.id).value);
        const difference = currentValue - metric.previousValue;
        const trend = difference > 0 ? "Increase" : difference < 0 ? "Decrease" : "No Change";

        const comparisonElement = document.createElement("div");
        comparisonElement.className = "comparison-item";
        comparisonElement.innerHTML = `
            <p>
                <strong>${metric.label}:</strong> 
                Previous: ${metric.previousValue}, Current: ${currentValue} 
                (<span style="color: ${trend === "Increase" ? "red" : trend === "Decrease" ? "green" : "gray"};">
                    ${trend} by ${Math.abs(difference)}
                </span>)
            </p>
        `;

        comparisonContainer.appendChild(comparisonElement);
    });
}

// Initialize Risk Comparison on Page Load
document.addEventListener("DOMContentLoaded", () => {
    compareCurrentVsPreviousAssessment();
});
// Interactive Guidance System (NEW FEATURE)
function interactiveGuidance() {
    const guidanceContainer = document.getElementById("interactive-guidance");
    guidanceContainer.innerHTML = ""; // Clear existing guidance

    const tips = [
        { topic: "Starting Your Assessment", advice: "Ensure all project details are filled out accurately." },
        { topic: "Risk Evaluation", advice: "Use sliders to adjust environmental risk levels based on real-world observations." },
        { topic: "Recommendations", advice: "Review recommendations regularly and implement mitigation measures as soon as possible." },
        { topic: "Visualization Tools", advice: "Leverage charts and heatmaps to communicate findings effectively." },
        { topic: "Compliance", advice: "Check policy compliance status and address unmet areas promptly." },
    ];

    tips.forEach(tip => {
        const tipElement = document.createElement("div");
        tipElement.className = "guidance-tip";
        tipElement.innerHTML = `
            <h4>${tip.topic}</h4>
            <p>${tip.advice}</p>
        `;
        guidanceContainer.appendChild(tipElement);
    });
}

// Initialize Interactive Guidance on Page Load
document.addEventListener("DOMContentLoaded", () => {
    interactiveGuidance();
});

// Enhanced User Feedback System (NEW FEATURE)
function gatherUserFeedback() {
    const feedbackContainer = document.getElementById("user-feedback");
    feedbackContainer.innerHTML = ""; // Clear existing feedback section

    const feedbackForm = `
        <h4>We value your feedback!</h4>
        <form id="feedback-form">
            <label for="feedback">Please share your thoughts:</label>
            <textarea id="feedback" rows="3" placeholder="Type your feedback here..."></textarea>
            <button type="submit" class="button">Submit Feedback</button>
        </form>
    `;
    feedbackContainer.innerHTML = feedbackForm;

    // Handle feedback submission
    document.getElementById("feedback-form").addEventListener("submit", (event) => {
        event.preventDefault();
        const feedback = document.getElementById("feedback").value;
        alert("Thank you for your feedback! Here's what you submitted:\n\n" + feedback);
    });
}

// Initialize User Feedback System on Page Load
document.addEventListener("DOMContentLoaded", () => {
    gatherUserFeedback();
});

// Real-time Notifications System (NEW FEATURE)
function notifyUser(action) {
    const notificationContainer = document.getElementById("notifications");
    const notification = document.createElement("div");
    notification.className = "notification";
    notification.innerText = `Action performed: ${action}`;
    notificationContainer.appendChild(notification);
}

// Attach Notifications to Key Actions
document.getElementById("save-local").addEventListener("click", () => {
    notifyUser("Data saved locally (CSV).");
});
document.getElementById("delete-data").addEventListener("click", () => {
    notifyUser("All data deleted.");
});
document.getElementById("generate-report").addEventListener("click", () => {
    notifyUser("PDF report generated.");
});

// Accessibility Improvements (NEW FEATURE)
function improveAccessibility() {
    const elements = document.querySelectorAll("form input, form textarea, button");
    elements.forEach(element => {
        element.setAttribute("aria-label", element.placeholder || element.innerText);
    });
}

// Initialize Accessibility Enhancements on Page Load
document.addEventListener("DOMContentLoaded", () => {
    improveAccessibility();
});