/**
 * Fix for Jack Cheng's SRE Copilot Multi-Modal Demo Functionality
 * 
 * This file contains the fixed interactive functionality for the multi-modal demo
 * focusing on proper visual feedback during analysis
 */

// Dummy metrics data
const scenarioData = {
    'jms': {
        metrics: {
            'CPU Usage (%)': [
                { timestamp: '2024-04-08T11:00:00', value: 45 },
                { timestamp: '2024-04-08T11:05:00', value: 65 },
                { timestamp: '2024-04-08T11:10:00', value: 85 }
            ],
            'Memory Usage (GB)': [
                { timestamp: '2024-04-08T11:00:00', value: 4.2 },
                { timestamp: '2024-04-08T11:05:00', value: 4.8 },
                { timestamp: '2024-04-08T11:10:00', value: 5.5 }
            ],
            'Network Latency (ms)': [
                { timestamp: '2024-04-08T11:00:00', value: 50 },
                { timestamp: '2024-04-08T11:05:00', value: 150 },
                { timestamp: '2024-04-08T11:10:00', value: 250 }
            ],
            'Error Rate (%)': [
                { timestamp: '2024-04-08T11:00:00', value: 0.5 },
                { timestamp: '2024-04-08T11:05:00', value: 2.5 },
                { timestamp: '2024-04-08T11:10:00', value: 5.0 }
            ]
        },
        logs: [
            '2024-04-08 11:00:00 INFO  Connection established to message broker',
            '2024-04-08 11:05:00 WARN  Increased latency detected in message processing',
            '2024-04-08 11:10:00 ERROR Connection timeout to message broker'
        ],
        dashboards: ['jms-network-dashboard.png', 'jms-broker-dashboard.png', 'jms-application-dashboard.png']
    },
    'jvm': {
        metrics: {
            'Heap Usage (GB)': [
                { timestamp: '2024-04-08T11:00:00', value: 2.1 },
                { timestamp: '2024-04-08T11:05:00', value: 3.8 },
                { timestamp: '2024-04-08T11:10:00', value: 6.2 }
            ],
            'GC Pause Time (ms)': [
                { timestamp: '2024-04-08T11:00:00', value: 100 },
                { timestamp: '2024-04-08T11:05:00', value: 250 },
                { timestamp: '2024-04-08T11:10:00', value: 500 }
            ],
            'Thread Count': [
                { timestamp: '2024-04-08T11:00:00', value: 50 },
                { timestamp: '2024-04-08T11:05:00', value: 75 },
                { timestamp: '2024-04-08T11:10:00', value: 120 }
            ],
            'CPU Usage (%)': [
                { timestamp: '2024-04-08T11:00:00', value: 60 },
                { timestamp: '2024-04-08T11:05:00', value: 80 },
                { timestamp: '2024-04-08T11:10:00', value: 95 }
            ]
        },
        logs: [
            '2024-04-08 11:00:00 INFO  JVM started with 8GB heap',
            '2024-04-08 11:05:00 WARN  High memory pressure detected',
            '2024-04-08 11:10:00 ERROR OutOfMemoryError: Java heap space'
        ],
        dashboards: ['jvm-memory-dashboard.png', 'jvm-gc-dashboard.png', 'jvm-threads-dashboard.png']
    }
};

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
    const metricsData = document.getElementById('metrics-data');
    const metricsChart = document.querySelector('.metrics-chart');

    console.log('DOM elements initialized:', {
        startAnalysisBtn: startAnalysisBtn !== null,
        resetDemoBtn: resetDemoBtn !== null,
        analysisPanel: analysisPanel !== null,
        metricsData: metricsData !== null,
        metricsChart: metricsChart !== null
    });

    // Function to update metrics
    function updateMetrics() {
        const metricsData = document.getElementById('metrics-data');
        const metricsChart = document.querySelector('.metrics-chart');

        // Static metrics data display
        if (metricsData) {
            metricsData.innerHTML = `
                <div class="metrics-grid">
                    <div class="metric-item">
                        <div class="metric-name">CPU Usage (%)</div>
                        <div class="metric-value" style="color: #dc3545">85 <span class="trend-arrow up">↑</span></div>
                    </div>
                    <div class="metric-item">
                        <div class="metric-name">Memory Usage (GB)</div>
                        <div class="metric-value" style="color: #dc3545">5.5 <span class="trend-arrow up">↑</span></div>
                    </div>
                    <div class="metric-item">
                        <div class="metric-name">Network Latency (ms)</div>
                        <div class="metric-value" style="color: #dc3545">250 <span class="trend-arrow up">↑</span></div>
                    </div>
                    <div class="metric-item">
                        <div class="metric-name">Error Rate (%)</div>
                        <div class="metric-value" style="color: #dc3545">5.0 <span class="trend-arrow up">↑</span></div>
                    </div>
                </div>`;
        }

        // Static chart display
        if (metricsChart) {
            metricsChart.innerHTML = `
                <div class="charts-container">
                    <div class="metric-chart">
                        <h4>System Metrics Overview</h4>
                        <svg width="600" height="300" viewBox="0 0 600 300">
                            <!-- Background -->
                            <rect width="600" height="300" fill="#f8f9fa" rx="4"/>
                            
                            <!-- Grid lines -->
                            <g stroke="#e0e0e0" stroke-width="1">
                                <line x1="50" y1="250" x2="550" y2="250"/>
                                <line x1="50" y1="200" x2="550" y2="200"/>
                                <line x1="50" y1="150" x2="550" y2="150"/>
                                <line x1="50" y1="100" x2="550" y2="100"/>
                                <line x1="50" y1="50" x2="550" y2="50"/>
                            </g>

                            <!-- CPU Usage Line (Red) -->
                            <path d="M 50 200 L 200 150 L 350 100 L 500 50" 
                                  stroke="#dc3545" 
                                  stroke-width="3" 
                                  fill="none"/>
                            <circle cx="50" cy="200" r="4" fill="#dc3545"/>
                            <circle cx="200" cy="150" r="4" fill="#dc3545"/>
                            <circle cx="350" cy="100" r="4" fill="#dc3545"/>
                            <circle cx="500" cy="50" r="4" fill="#dc3545"/>

                            <!-- Memory Usage Line (Blue) -->
                            <path d="M 50 220 L 200 180 L 350 120 L 500 80" 
                                  stroke="#0d6efd" 
                                  stroke-width="3" 
                                  fill="none"/>
                            <circle cx="50" cy="220" r="4" fill="#0d6efd"/>
                            <circle cx="200" cy="180" r="4" fill="#0d6efd"/>
                            <circle cx="350" cy="120" r="4" fill="#0d6efd"/>
                            <circle cx="500" cy="80" r="4" fill="#0d6efd"/>

                            <!-- Network Latency Line (Yellow) -->
                            <path d="M 50 180 L 200 220 L 350 180 L 500 250" 
                                  stroke="#ffc107" 
                                  stroke-width="3" 
                                  fill="none"/>
                            <circle cx="50" cy="180" r="4" fill="#ffc107"/>
                            <circle cx="200" cy="220" r="4" fill="#ffc107"/>
                            <circle cx="350" cy="180" r="4" fill="#ffc107"/>
                            <circle cx="500" cy="250" r="4" fill="#ffc107"/>

                            <!-- Labels -->
                            <text x="30" y="250" text-anchor="end" fill="#666">0</text>
                            <text x="30" y="200" text-anchor="end" fill="#666">25</text>
                            <text x="30" y="150" text-anchor="end" fill="#666">50</text>
                            <text x="30" y="100" text-anchor="end" fill="#666">75</text>
                            <text x="30" y="50" text-anchor="end" fill="#666">100</text>

                            <!-- Legend -->
                            <g transform="translate(50, 270)">
                                <circle cx="10" cy="0" r="4" fill="#dc3545"/>
                                <text x="20" y="5" fill="#666">CPU Usage</text>
                                <circle cx="120" cy="0" r="4" fill="#0d6efd"/>
                                <text x="130" y="5" fill="#666">Memory</text>
                                <circle cx="210" cy="0" r="4" fill="#ffc107"/>
                                <text x="220" y="5" fill="#666">Latency</text>
                            </g>
                        </svg>
                    </div>
                </div>`;
        }
    }

    // Initialize the demo with metrics
    updateMetrics();
    loadScenarioData(currentScenario);

    // Event listeners for scenario buttons
    scenarioBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            if (analysisStarted && !analysisCompleted) return;
            scenarioBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentScenario = this.dataset.scenario;
            loadScenarioData(currentScenario);
            updateMetrics();  // Update metrics when scenario changes
            resetAnalysis();
        });
    });

    // Event listeners for tab buttons
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            tabBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentTab = this.dataset.tab;
            tabContents.forEach(content => content.classList.remove('active'));
            document.getElementById(`${currentTab}-content`).classList.add('active');
            if (currentTab === 'metrics') {
                updateMetrics();  // Refresh metrics when switching to metrics tab
            }
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
        console.log('Loading scenario data:', scenario);
        const data = scenarioData[scenario];
        
        // Update logs
        const appLogs = document.getElementById('app-logs');
        if (appLogs) {
            appLogs.innerHTML = `<pre>${data.logs.join('\n')}</pre>`;
        }
        
        // Update metrics
        updateMetrics();
        
        // Load dashboard images
        loadDashboardImages(data.dashboards);
        
        // Reset dashboard carousel
        currentDashboardIndex = 0;
        updateDashboardCarousel();
    }

    // Function to render metrics
    function renderMetrics(metrics, dataContainer) {
        console.log('Rendering metrics:', metrics);
        let dataHtml = '<div class="metrics-grid">';
        let chartHtml = '<div class="charts-container">';
        
        Object.entries(metrics).forEach(([metricName, values], index) => {
            // Add metric data
            const latestValue = values[values.length - 1].value;
            const previousValue = values[values.length - 2]?.value || 0;
            const trend = latestValue > previousValue ? 'up' : 'down';
            const trendColor = getTrendColor(metricName, trend);
            
            dataHtml += `
                <div class="metric-item">
                    <div class="metric-name">${metricName}</div>
                    <div class="metric-value" style="color: ${trendColor}">
                        ${latestValue}
                        <span class="trend-arrow ${trend}">${trend === 'up' ? '↑' : '↓'}</span>
                    </div>
                </div>
            `;
            
            // Add metric chart
            chartHtml += createMetricChart(metricName, values, index);
        });
        
        dataHtml += '</div>';
        chartHtml += '</div>';

        // Update the metrics data container
        dataContainer.innerHTML = dataHtml;
        
        // Update the chart container
        const metricsChart = document.querySelector('.metrics-chart');
        if (metricsChart) {
            metricsChart.innerHTML = chartHtml;
        }
    }

    // Function to create a metric chart
    function createMetricChart(metricName, values, index) {
        const width = 300;
        const height = 150;
        const padding = 20;
        const chartWidth = width - (padding * 2);
        const chartHeight = height - (padding * 2);
        
        // Calculate scales
        const maxValue = Math.max(...values.map(v => v.value));
        const minValue = Math.min(...values.map(v => v.value));
        
        // Create points for the line
        const points = values.map((v, i) => {
            const x = padding + (i * (chartWidth / (values.length - 1)));
            const y = height - (padding + ((v.value - minValue) * chartHeight / (maxValue - minValue)));
            return `${x},${y}`;
        }).join(' ');
        
        return `
            <div class="metric-chart">
                <h4>${metricName}</h4>
                <svg width="${width}" height="${height}" class="metric-svg">
                    <rect width="${width}" height="${height}" fill="#f8f9fa" rx="4"/>
                    <polyline 
                        points="${points}"
                        fill="none"
                        stroke="${getMetricColor(metricName)}"
                        stroke-width="2"
                    />
                    <!-- Add dots for data points -->
                    ${values.map((v, i) => {
                        const x = padding + (i * (chartWidth / (values.length - 1)));
                        const y = height - (padding + ((v.value - minValue) * chartHeight / (maxValue - minValue)));
                        return `<circle cx="${x}" cy="${y}" r="3" fill="${getMetricColor(metricName)}"/>`;
                    }).join('')}
                </svg>
            </div>
        `;
    }

    // Function to get trend color
    function getTrendColor(metricName, trend) {
        if (metricName.includes('Error') || metricName.includes('Loss')) {
            return trend === 'up' ? '#dc3545' : '#198754';
        }
        return trend === 'up' ? '#198754' : '#dc3545';
    }

    // Function to get metric color
    function getMetricColor(metricName) {
        if (metricName.includes('Error') || metricName.includes('Loss')) {
            return '#dc3545';
        } else if (metricName.includes('Latency') || metricName.includes('Time')) {
            return '#ffc107';
        }
        return '#0d6efd';
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
        // Add error handling for dashboard images
        const dashboardImgs = document.querySelectorAll('.dashboard-image img');
        dashboardImgs.forEach(img => {
            img.onerror = function() {
                // Replace with placeholder content
                const placeholder = document.createElement('div');
                placeholder.className = 'dashboard-placeholder';
                placeholder.innerHTML = `
                    <div class="placeholder-content">
                        <svg width="100" height="100" viewBox="0 0 100 100">
                            <rect width="100" height="100" fill="#f0f0f0"/>
                            <text x="50" y="50" text-anchor="middle" fill="#666">
                                Dashboard Preview
                            </text>
                        </svg>
                        <p>Dashboard image not available</p>
                    </div>
                `;
                this.parentNode.replaceChild(placeholder, this);
            };
        });
    }

    // Add CSS styles for metrics and charts
    const style = document.createElement('style');
    style.textContent = `
        .metrics-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1rem;
            margin-bottom: 2rem;
        }
        .metric-item {
            background: #fff;
            padding: 1rem;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .metric-name {
            font-size: 0.9rem;
            color: #666;
            margin-bottom: 0.5rem;
        }
        .metric-value {
            font-size: 1.5rem;
            font-weight: bold;
        }
        .trend-arrow {
            font-size: 1rem;
            margin-left: 0.5rem;
        }
        .charts-container {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 1rem;
            padding: 1rem;
        }
        .metric-chart {
            background: #fff;
            padding: 1rem;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .metric-chart h4 {
            margin: 0 0 1rem 0;
            color: #333;
        }
        .metric-svg {
            width: 100%;
            height: auto;
        }
    `;
    document.head.appendChild(style);
});
