/**
 * Fix for Jack Cheng's SRE Copilot Multi-Modal Demo Functionality
 * 
 * This file contains the fixed interactive functionality for the multi-modal demo
 * focusing on proper visual feedback during analysis
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize variables
    let currentScenario = 'jms';
    let currentTab = 'logs';
    let currentDashboardIndex = 0;
    let analysisStarted = false;
    let analysisCompleted = false;

    // DOM elements
    const scenarioBtns = document.querySelectorAll('.scenario-btn');
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    const startAnalysisBtn = document.getElementById('start-analysis');
    const resetDemoBtn = document.getElementById('reset-demo');
    const progressFill = document.querySelector('.progress-fill');
    const progressStatus = document.querySelector('.progress-status');
    const analysisPanel = document.querySelector('.analysis-panel');
    const correlationDiagram = document.getElementById('correlation-diagram');
    const detectedIssues = document.getElementById('detected-issues');
    const rootCause = document.getElementById('root-cause');
    const recommendations = document.getElementById('recommendations');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const indicators = document.querySelectorAll('.indicator');
    const dashboardImages = document.querySelectorAll('.dashboard-image');

    console.log('DOM elements initialized:', {
        startAnalysisBtn: startAnalysisBtn !== null,
        resetDemoBtn: resetDemoBtn !== null,
        analysisPanel: analysisPanel !== null
    });

    // Initialize the demo
    loadScenarioData(currentScenario);

    // Event listeners for scenario buttons
    scenarioBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            if (analysisStarted && !analysisCompleted) return; // Prevent changing scenario during analysis
            
            // Update active button
            scenarioBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Load scenario data
            currentScenario = this.dataset.scenario;
            loadScenarioData(currentScenario);
            resetAnalysis();
        });
    });

    // Event listeners for tab buttons
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active button
            tabBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding tab content
            currentTab = this.dataset.tab;
            tabContents.forEach(content => content.classList.remove('active'));
            document.getElementById(`${currentTab}-content`).classList.add('active');
        });
    });

    // Event listener for start analysis button
    if (startAnalysisBtn) {
        console.log('Adding click event listener to start analysis button');
        startAnalysisBtn.addEventListener('click', function() {
            console.log('Start analysis button clicked');
            if (analysisStarted) {
                console.log('Analysis already started, ignoring click');
                return;
            }
            
            // Set analysis state
            analysisStarted = true;
            console.log('Setting analysis started to true');
            
            // Update UI to show analysis is starting
            analysisPanel.classList.add('analyzing');
            analysisPanel.classList.remove('completed');
            startAnalysisBtn.disabled = true;
            
            // Reset progress and show initial state
            progressFill.style.width = '0%';
            progressStatus.textContent = 'Initializing multi-modal analysis...';
            progressStatus.style.color = '#0d47a1';
            progressStatus.style.fontWeight = '500';
            
            // Clear previous results
            if (detectedIssues) detectedIssues.innerHTML = '';
            if (rootCause) rootCause.innerHTML = '<p>Analyzing data sources...</p>';
            if (recommendations) recommendations.innerHTML = '<li>Waiting for analysis to complete...</li>';
            
            // Hide results section during analysis
            const resultsSection = document.querySelector('.analysis-results');
            if (resultsSection) {
                resultsSection.style.opacity = '0';
                resultsSection.style.transform = 'translateY(10px)';
            }
            
            // Simulate analysis progress
            console.log('Starting analysis simulation');
            simulateAnalysis();
        });
    } else {
        console.error('Start analysis button not found in the DOM');
    }

    // Event listener for reset demo button
    if (resetDemoBtn) {
        console.log('Adding click event listener to reset demo button');
        resetDemoBtn.addEventListener('click', function() {
            resetAnalysis();
            loadScenarioData(currentScenario);
        });
    } else {
        console.error('Reset demo button not found in the DOM');
    }

    // Event listeners for carousel controls
    if (prevBtn && nextBtn) {
        console.log('Adding click event listeners to carousel controls');
        prevBtn.addEventListener('click', function() {
            showDashboard(currentDashboardIndex - 1);
        });
        nextBtn.addEventListener('click', function() {
            showDashboard(currentDashboardIndex + 1);
        });
    } else {
        console.error('Carousel control buttons not found in the DOM');
    }

    indicators.forEach(indicator => {
        indicator.addEventListener('click', function() {
            showDashboard(parseInt(this.dataset.index));
        });
    });

    // Function to simulate analysis with proper visual feedback
    function simulateAnalysis() {
        const steps = [
            { progress: 20, status: 'Collecting and normalizing data...', delay: 1000 },
            { progress: 40, status: 'Processing log entries...', delay: 1500 },
            { progress: 60, status: 'Analyzing metric patterns...', delay: 1500 },
            { progress: 80, status: 'Correlating across data sources...', delay: 1500 },
            { progress: 100, status: 'Analysis complete', delay: 1000 }
        ];
        
        let currentStep = 0;
        
        // Immediately show first step
        updateProgress(steps[0].progress, steps[0].status);
        
        // Process remaining steps with delays
        function processNextStep() {
            currentStep++;
            
            if (currentStep < steps.length) {
                updateProgress(steps[currentStep].progress, steps[currentStep].status);
                setTimeout(processNextStep, steps[currentStep].delay);
            } else {
                // Analysis completed
                completeAnalysis();
            }
        }
        
        // Start processing steps after initial delay
        setTimeout(processNextStep, steps[0].delay);
    }
    
    // Function to update progress UI
    function updateProgress(progress, status) {
        console.log(`Updating progress: ${progress}%, status: ${status}`);
        
        // Update progress bar with smooth transition
        progressFill.style.width = `${progress}%`;
        
        // Update status text
        progressStatus.textContent = status;
        
        // Change color based on progress
        if (progress >= 100) {
            progressStatus.style.color = '#388e3c';
            progressStatus.style.fontWeight = 'bold';
        } else {
            progressStatus.style.color = '#0d47a1';
            progressStatus.style.fontWeight = '500';
        }
    }
    
    // Function to complete analysis and show results
    function completeAnalysis() {
        console.log('Analysis completed, displaying results');
        
        // Update UI state
        analysisStarted = false;
        analysisCompleted = true;
        analysisPanel.classList.remove('analyzing');
        analysisPanel.classList.add('completed');
        startAnalysisBtn.disabled = false;
        
        // Get analysis results based on current scenario
        const results = getAnalysisResults(currentScenario);
        console.log('Displaying analysis results:', results);
        
        // Update correlation diagram
        if (correlationDiagram) {
            correlationDiagram.innerHTML = createCorrelationDiagram(results);
        }
        
        // Update detected issues
        if (detectedIssues) {
            let issuesHtml = '';
            results.detectedIssues.forEach(issue => {
                issuesHtml += `<li>${issue}</li>`;
            });
            detectedIssues.innerHTML = issuesHtml;
        }
        
        // Update root cause
        if (rootCause) {
            rootCause.innerHTML = `<p>${results.rootCause}</p>`;
        }
        
        // Update recommendations
        if (recommendations) {
            let recommendationsHtml = '';
            results.recommendations.forEach(rec => {
                recommendationsHtml += `<li>${rec}</li>`;
            });
            recommendations.innerHTML = recommendationsHtml;
        }
        
        // Show results with fade-in animation
        setTimeout(() => {
            const resultsSection = document.querySelector('.analysis-results');
            if (resultsSection) {
                resultsSection.style.opacity = '1';
                resultsSection.style.transform = 'translateY(0)';
            }
        }, 300);
    }

    // Function to reset analysis state
    function resetAnalysis() {
        console.log('Resetting analysis state');
        
        // Reset state variables
        analysisStarted = false;
        analysisCompleted = false;
        
        // Reset UI elements
        analysisPanel.classList.remove('analyzing', 'completed');
        startAnalysisBtn.disabled = false;
        progressFill.style.width = '0%';
        progressStatus.textContent = 'Initializing multi-modal analysis...';
        progressStatus.style.color = '#666';
        progressStatus.style.fontWeight = 'normal';
        
        // Reset correlation diagram
        if (correlationDiagram) {
            correlationDiagram.innerHTML = '<div class="correlation-placeholder">Start analysis to see correlations</div>';
        }
        
        // Reset results
        if (detectedIssues) detectedIssues.innerHTML = '';
        if (rootCause) rootCause.innerHTML = '<p>Waiting for analysis to complete...</p>';
        if (recommendations) recommendations.innerHTML = '<li>Waiting for analysis to complete...</li>';
        
        // Hide results section
        const resultsSection = document.querySelector('.analysis-results');
        if (resultsSection) {
            resultsSection.style.opacity = '0';
            resultsSection.style.transform = 'translateY(10px)';
        }
    }

    // Function to load scenario data
    function loadScenarioData(scenario) {
        const data = scenarioData[scenario];
        
        // Load application logs
        const appLogs = document.getElementById('app-logs');
        appLogs.innerHTML = formatLogs(data.logs);
        
        // Load metrics data
        const metricsData = document.getElementById('metrics-data');
        metricsData.innerHTML = formatMetrics(data.metrics);
        
        // Create metrics chart
        const metricsChart = document.querySelector('.metrics-chart');
        metricsChart.innerHTML = createMetricsChart(data.metrics);
        
        // Load dashboard images
        loadDashboardImages(data.dashboards);
        
        // Reset dashboard carousel
        currentDashboardIndex = 0;
        updateDashboardCarousel();
    }

    // Function to create correlation diagram
    function createCorrelationDiagram(results) {
        return `
            <svg width="100%" height="100%" viewBox="0 0 400 150">
                <defs>
                    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="#0d47a1" />
                    </marker>
                </defs>
                
                <!-- Nodes -->
                <circle cx="75" cy="50" r="25" fill="#e3f2fd" stroke="#0d47a1" stroke-width="2" />
                <text x="75" y="55" text-anchor="middle" font-size="12">Logs</text>
                
                <circle cx="200" cy="50" r="25" fill="#e3f2fd" stroke="#0d47a1" stroke-width="2" />
                <text x="200" y="55" text-anchor="middle" font-size="12">Metrics</text>
                
                <circle cx="325" cy="50" r="25" fill="#e3f2fd" stroke="#0d47a1" stroke-width="2" />
                <text x="325" y="55" text-anchor="middle" font-size="12">Dashboards</text>
                
                <rect x="150" y="100" width="100" height="40" rx="5" fill="#0d47a1" stroke="#0d47a1" stroke-width="2" />
                <text x="200" y="125" text-anchor="middle" font-size="12" fill="white">Root Cause</text>
                
                <!-- Connections -->
                <line x1="95" y1="65" x2="175" y2="100" stroke="#0d47a1" stroke-width="2" marker-end="url(#arrowhead)" />
                <line x1="200" y1="75" x2="200" y2="95" stroke="#0d47a1" stroke-width="2" marker-end="url(#arrowhead)" />
                <line x1="305" y1="65" x2="225" y2="100" stroke="#0d47a1" stroke-width="2" marker-end="url(#arrowhead)" />
            </svg>
        `;
    }

    // Function to get analysis results
    function getAnalysisResults(scenario) {
        // Default results structure
        const results = {
            detectedIssues: [
                'High latency in message processing',
                'Connection timeouts to message broker',
                'Increasing error rate in application logs',
                'Memory usage spike preceding connection failures',
                'Network packet loss detected in system metrics'
            ],
            rootCause: 'The root cause is a network connectivity issue between application servers and the message broker.',
            recommendations: [
                'Check network configuration between application servers and message broker',
                'Increase connection timeout settings in the JMS configuration',
                'Implement circuit breaker pattern for JMS connections',
                'Add retry logic with exponential backoff for connection attempts',
                'Monitor network metrics between application and message broker'
            ]
        };
        
        // Customize based on scenario if needed
        if (scenario === 'jvm') {
            results.detectedIssues = [
                'Gradual memory increase over time',
                'Garbage collection pauses increasing in frequency',
                'Out of memory errors in application logs',
                'High CPU usage during garbage collection',
                'Reduced throughput preceding errors'
            ];
            results.rootCause = 'The root cause is a memory leak in the application code causing the JVM to exhaust heap space.';
            results.recommendations = [
                'Increase heap size as a temporary measure',
                'Perform heap dump analysis to identify memory leaks',
                'Review recent code changes that might introduce memory leaks',
                'Implement memory usage monitoring with alerts',
                'Consider using tools like JProfiler or VisualVM for detailed analysis'
            ];
        }
        
        return results;
    }

    // Function to show dashboard at specified index
    function showDashboard(index) {
        const totalDashboards = dashboardImages.length;
        
        // Ensure index is within bounds
        if (index < 0) {
            index = totalDashboards - 1;
        } else if (index >= totalDashboards) {
            index = 0;
        }
        
        // Update current index
        currentDashboardIndex = index;
        
        // Update dashboard display
        dashboardImages.forEach((img, i) => {
            img.classList.toggle('active', i === index);
        });
        
        // Update indicators
        indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === index);
        });
    }

    // Function to update dashboard carousel
    function updateDashboardCarousel() {
        showDashboard(currentDashboardIndex);
    }

    // Function to load dashboard images
    function loadDashboardImages(dashboards) {
        // Implementation depends on how dashboards are structured
        // This is a placeholder for the actual implementation
    }

    // Function to format logs
    function formatLogs(logs) {
        // Implementation depends on log format
        // This is a placeholder for the actual implementation
        if (!logs || logs.length === 0) return '<pre>No logs found.</pre>';
        
        let html = '';
        logs.forEach(log => {
            html += `<div class="log-entry">${log}</div>`;
        });
        
        return html;
    }

    // Function to format metrics
    function formatMetrics(metrics) {
        // Implementation depends on metrics format
        // This is a placeholder for the actual implementation
        if (!metrics) return '<pre>No metrics found.</pre>';
        
        return '<div class="metrics-table">Metrics data would be displayed here</div>';
    }

    // Function to create metrics chart
    function createMetricsChart(metrics) {
        // Implementation depends on metrics format
        // This is a placeholder for the actual implementation
        if (!metrics) return '<div class="chart-placeholder">No metrics data available</div>';
        
        return '<svg class="metrics-svg" width="100%" height="200"></svg>';
    }
});
