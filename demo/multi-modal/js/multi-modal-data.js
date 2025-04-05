// Multi-Modal Demo Data
const scenarioData = {
    jms: {
        logs: [
            "08:00:00 INFO [main] com.example.MessageProcessor: Application starting up. Version: 2.5.3",
            "08:00:01 INFO [main] com.example.MessageProcessor: Initializing connection pool with maxConnections=50",
            "08:00:02 INFO [main] com.example.jms.ConnectionManager: Establishing connection to JMS broker at jms://message-broker:61616",
            "08:00:03 INFO [main] com.example.jms.ConnectionManager: Successfully connected to JMS broker",
            "08:00:04 INFO [main] com.example.jms.QueueManager: Creating consumer for queue 'orders'",
            "08:00:05 INFO [main] com.example.jms.QueueManager: Creating consumer for queue 'notifications'",
            "08:00:06 INFO [main] com.example.MessageProcessor: Application started successfully",
            "08:15:23 WARN [JMS-Consumer-1] com.example.jms.ConnectionManager: Connection to JMS broker is unstable, latency increasing",
            "08:15:45 ERROR [JMS-Consumer-1] com.example.jms.ConnectionManager: Failed to receive message: javax.jms.JMSException: Connection timed out",
            "08:15:46 INFO [JMS-Consumer-1] com.example.jms.ConnectionManager: Attempting to reconnect to JMS broker",
            "08:15:58 ERROR [JMS-Consumer-1] com.example.jms.ConnectionManager: Reconnection failed: javax.jms.JMSException: Connection refused",
            "08:16:00 INFO [JMS-Consumer-1] com.example.jms.ConnectionManager: Retry 1/5: Attempting to reconnect to JMS broker",
            "08:16:12 ERROR [JMS-Consumer-1] com.example.jms.ConnectionManager: Reconnection failed: javax.jms.JMSException: Connection refused",
            "08:16:15 INFO [JMS-Consumer-1] com.example.jms.ConnectionManager: Retry 2/5: Attempting to reconnect to JMS broker",
            "08:16:27 ERROR [JMS-Consumer-1] com.example.jms.ConnectionManager: Reconnection failed: javax.jms.JMSException: Connection refused",
            "08:16:30 INFO [JMS-Consumer-1] com.example.jms.ConnectionManager: Retry 3/5: Attempting to reconnect to JMS broker",
            "08:16:42 ERROR [JMS-Consumer-1] com.example.jms.ConnectionManager: Reconnection failed: javax.jms.JMSException: Connection refused",
            "08:16:45 INFO [JMS-Consumer-1] com.example.jms.ConnectionManager: Retry 4/5: Attempting to reconnect to JMS broker",
            "08:16:57 ERROR [JMS-Consumer-1] com.example.jms.ConnectionManager: Reconnection failed: javax.jms.JMSException: Connection refused",
            "08:17:00 INFO [JMS-Consumer-1] com.example.jms.ConnectionManager: Retry 5/5: Attempting to reconnect to JMS broker",
            "08:17:12 ERROR [JMS-Consumer-1] com.example.jms.ConnectionManager: Reconnection failed: javax.jms.JMSException: Connection refused",
            "08:17:13 ERROR [JMS-Consumer-1] com.example.jms.ConnectionManager: Maximum reconnection attempts reached. Giving up.",
            "08:17:14 ERROR [main] com.example.MessageProcessor: JMS connection failure detected. Message processing halted.",
            "08:17:15 WARN [main] com.example.MessageProcessor: System health check failed: JMS connectivity issue detected",
            "08:17:16 INFO [main] com.example.monitoring.AlertManager: Sending alert: JMS_CONNECTION_FAILURE"
        ],
        metrics: {
            "Network Latency (ms)": [
                { time: "08:00", value: 5 },
                { time: "08:05", value: 7 },
                { time: "08:10", value: 12 },
                { time: "08:15", value: 150 },
                { time: "08:16", value: 320 },
                { time: "08:17", value: 450 }
            ],
            "Packet Loss (%)": [
                { time: "08:00", value: 0 },
                { time: "08:05", value: 0.1 },
                { time: "08:10", value: 0.5 },
                { time: "08:15", value: 5.2 },
                { time: "08:16", value: 15.7 },
                { time: "08:17", value: 27.3 }
            ],
            "JMS Connection Count": [
                { time: "08:00", value: 50 },
                { time: "08:05", value: 50 },
                { time: "08:10", value: 48 },
                { time: "08:15", value: 25 },
                { time: "08:16", value: 10 },
                { time: "08:17", value: 0 }
            ],
            "Message Throughput (msg/s)": [
                { time: "08:00", value: 120 },
                { time: "08:05", value: 118 },
                { time: "08:10", value: 105 },
                { time: "08:15", value: 45 },
                { time: "08:16", value: 12 },
                { time: "08:17", value: 0 }
            ],
            "Application Error Rate (errors/min)": [
                { time: "08:00", value: 0 },
                { time: "08:05", value: 0 },
                { time: "08:10", value: 0.2 },
                { time: "08:15", value: 12 },
                { time: "08:16", value: 45 },
                { time: "08:17", value: 60 }
            ]
        },
        dashboards: [
            {
                imageUrl: "https://raw.githubusercontent.com/jackchengsre/demo-resources/main/jms-network-dashboard.png",
                title: "JMS Network Dashboard",
                description: "Network connectivity dashboard showing packet loss and latency"
            },
            {
                imageUrl: "https://raw.githubusercontent.com/jackchengsre/demo-resources/main/jms-broker-dashboard.png",
                title: "JMS Broker Dashboard",
                description: "JMS broker performance with connection counts and throughput"
            },
            {
                imageUrl: "https://raw.githubusercontent.com/jackchengsre/demo-resources/main/jms-application-dashboard.png",
                title: "JMS Application Dashboard",
                description: "Application performance with error rates and status"
            }
        ],
        analysis: {
            detectedIssues: [
                "Network packet loss exceeding 25% between application servers and message broker",
                "Network latency spike from 5ms to 450ms at 08:15",
                "JMS connection failures with 'Connection refused' errors",
                "Complete loss of message throughput at 08:17",
                "Application error rate increased to 60 errors/min"
            ],
            rootCause: "The root cause is a network connectivity issue between the application servers and the JMS message broker. The packet loss and latency metrics show a significant degradation starting at 08:15, which directly correlates with the JMS connection failures. The dashboard visualization confirms a router CPU spike and network interface errors on the path between application servers and the message broker.",
            recommendations: [
                "Check the network router (RTR-42) between application servers and message broker for hardware issues",
                "Verify network interface configurations on both application servers and message broker",
                "Implement circuit breaker pattern in the JMS connection manager to handle network instability",
                "Add automatic failover to backup message broker in different network segment",
                "Enhance monitoring with network path visualization between critical components"
            ]
        }
    },
    jvm: {
        logs: [
            "10:00:00 INFO [main] com.example.OrderProcessor: Application starting up. Version: 3.1.2",
            "10:00:01 INFO [main] com.example.OrderProcessor: JVM settings: -Xms2g -Xmx4g -XX:+UseG1GC",
            "10:00:02 INFO [main] com.example.OrderProcessor: Initializing order processing engine",
            "10:00:03 INFO [main] com.example.OrderProcessor: Application started successfully",
            "10:15:23 INFO [GC] [G1 Young Generation] 2048M->256M(4096M), 0.0324530 secs",
            "10:30:45 INFO [GC] [G1 Young Generation] 2048M->312M(4096M), 0.0412650 secs",
            "10:45:12 INFO [GC] [G1 Young Generation] 2048M->389M(4096M), 0.0523780 secs",
            "11:00:34 INFO [GC] [G1 Young Generation] 2048M->512M(4096M), 0.0678120 secs",
            "11:15:56 INFO [GC] [G1 Young Generation] 2048M->768M(4096M), 0.0892340 secs",
            "11:30:23 INFO [GC] [G1 Young Generation] 2048M->1024M(4096M), 0.1245670 secs",
            "11:45:45 INFO [GC] [G1 Young Generation] 2048M->1536M(4096M), 0.1867890 secs",
            "11:50:12 WARN [Thread-12] com.example.cache.OrderCache: Cache hit ratio dropping: 95% -> 82%",
            "11:55:34 WARN [Thread-12] com.example.cache.OrderCache: Cache hit ratio dropping: 82% -> 64%",
            "12:00:01 INFO [GC] [G1 Young Generation] 2048M->1843M(4096M), 0.2345670 secs",
            "12:00:02 WARN [GC] [G1] GC overhead limit exceeded",
            "12:05:23 ERROR [Thread-15] com.example.OrderProcessor: Slow processing detected: Order #45678 took 12.5s (threshold: 2.0s)",
            "12:10:45 ERROR [Thread-18] com.example.OrderProcessor: Slow processing detected: Order #45679 took 18.3s (threshold: 2.0s)",
            "12:15:12 INFO [GC] [G1 Full GC] 3584M->3072M(4096M), 4.5678120 secs",
            "12:15:17 WARN [Thread-12] com.example.cache.OrderCache: Cache hit ratio critical: 64% -> 35%",
            "12:20:34 ERROR [Thread-22] com.example.OrderProcessor: Slow processing detected: Order #45680 took 25.7s (threshold: 2.0s)",
            "12:25:56 INFO [GC] [G1 Full GC] 3840M->3584M(4096M), 6.7890120 secs",
            "12:30:23 ERROR [main] java.lang.OutOfMemoryError: Java heap space",
            "12:30:24 ERROR [main] com.example.OrderProcessor: Critical error: OutOfMemoryError",
            "12:30:25 INFO [main] com.example.monitoring.AlertManager: Sending alert: JVM_OUT_OF_MEMORY"
        ],
        metrics: {
            "Heap Usage (MB)": [
                { time: "10:00", value: 512 },
                { time: "10:30", value: 768 },
                { time: "11:00", value: 1024 },
                { time: "11:30", value: 1536 },
                { time: "12:00", value: 2560 },
                { time: "12:15", value: 3072 },
                { time: "12:30", value: 3840 }
            ],
            "GC Pause Time (ms)": [
                { time: "10:15", value: 32 },
                { time: "10:30", value: 41 },
                { time: "10:45", value: 52 },
                { time: "11:00", value: 68 },
                { time: "11:15", value: 89 },
                { time: "11:30", value: 125 },
                { time: "11:45", value: 187 },
                { time: "12:00", value: 235 },
                { time: "12:15", value: 4568 },
                { time: "12:25", value: 6789 }
            ],
            "Active Threads": [
                { time: "10:00", value: 25 },
                { time: "10:30", value: 28 },
                { time: "11:00", value: 32 },
                { time: "11:30", value: 45 },
                { time: "12:00", value: 78 },
                { time: "12:15", value: 112 },
                { time: "12:30", value: 145 }
            ],
            "Response Time (ms)": [
                { time: "10:00", value: 120 },
                { time: "10:30", value: 135 },
                { time: "11:00", value: 142 },
                { time: "11:30", value: 189 },
                { time: "12:00", value: 567 },
                { time: "12:15", value: 3450 },
                { time: "12:30", value: 12500 }
            ],
            "Order Processing Rate (orders/min)": [
                { time: "10:00", value: 1200 },
                { time: "10:30", value: 1180 },
                { time: "11:00", value: 1150 },
                { time: "11:30", value: 950 },
                { time: "12:00", value: 720 },
                { time: "12:15", value: 320 },
                { time: "12:30", value: 45 }
            ]
        },
        dashboards: [
            {
                imageUrl: "images/jvm-memory-dashboard.png",
                title: "JVM Memory Dashboard",
                description: "Memory usage dashboard showing heap allocation and GC activity"
            },
            {
                imageUrl: "images/jvm-threads-dashboard.png",
                title: "JVM Threads Dashboard",
                description: "Thread analysis dashboard showing thread states and memory allocation"
            },
            {
                imageUrl: "images/application-performance-dashboard.png",
                title: "Application Performance Dashboard",
                description: "System performance dashboard with response times and resource utilization"
            }
        ],
        analysis: {
            detectedIssues: [
                "Steadily increasing heap usage from 512MB to 3840MB over 2.5 hours",
                "GC pause times increased from 32ms to 6789ms",
                "Full GC events occurring with minimal heap recovery",
                "Cache hit ratio degraded from 95% to 35%",
                "Thread count increased from 25 to 145 active threads",
                "Response time degraded from 120ms to 12500ms",
                "Order processing rate dropped from 1200 to 45 orders/min"
            ],
            rootCause: "The root cause is a memory leak in the OrderCache component. The analysis of heap usage patterns, GC behavior, and thread states indicates that the OrderCache is not properly releasing references to processed orders. This is evidenced by the steadily increasing heap usage despite full GC attempts, the degrading cache hit ratio, and the correlation between thread count increase and memory consumption. The dashboard visualization confirms this by showing the OrderCache instances consuming an abnormal amount of heap space.",
            recommendations: [
                "Fix the memory leak in OrderCache by ensuring proper cleanup of order references after processing",
                "Implement weak references for cached orders to allow garbage collection when memory pressure increases",
                "Add memory usage monitoring specific to the OrderCache component",
                "Implement circuit breaker pattern to degrade gracefully under memory pressure",
                "Consider increasing heap size as a temporary measure while implementing the fix",
                "Add automated heap dumps when memory usage exceeds 75% for post-mortem analysis"
            ]
        }
    }
};
