import os
from django.conf import settings
import matplotlib.pyplot as plt
import base64
from io import BytesIO


def save_plot(plot_img_path):
    """
    Save plot as base64-encoded data URL for deployment without persistent storage.
    Returns a data URL that can be directly used in <img src="..."> tags.
    """
    # Convert matplotlib figure to base64
    buffer = BytesIO()
    plt.savefig(buffer, format='png', bbox_inches='tight')
    buffer.seek(0)
    image_data = base64.b64encode(buffer.read()).decode()
    plt.close()
    
    # Return as data URL
    return f"data:image/png;base64,{image_data}"