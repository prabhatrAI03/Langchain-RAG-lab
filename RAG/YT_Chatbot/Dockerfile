# Use lightweight Python image
FROM python:3.12-slim

# Prevent Python from writing .pyc files
ENV PYTHONDONTWRITEBYTECODE=1

# Print Python output directly to terminal
ENV PYTHONUNBUFFERED=1

# Set working directory
WORKDIR /app

# Copy requirements first (better Docker layer caching)
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the remaining project files
COPY . .

# Streamlit default port
EXPOSE 8501

# Start Streamlit
CMD ["streamlit", "run", "app.py", "--server.address=0.0.0.0", "--server.port=8501"]
