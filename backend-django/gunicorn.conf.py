import multiprocessing

workers = 1
worker_class = "uvicorn.workers.UvicornWorker"
worker_connections = 1000
timeout = 120  # Increased from default 30s to 120s for TensorFlow/matplotlib startup
keepalive = 5
bind = "0.0.0.0:10000"
