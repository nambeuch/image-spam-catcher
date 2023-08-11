import numpy as np
from PIL import Image
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers
import autokeras as ak

from tensorflow.keras.models import load_model


def getPrediction(image):
    
    # load le modèle
    loaded_model = load_model("model/model_autokeras", custom_objects=ak.CUSTOM_OBJECTS) # on télécharge avec les objets customisés
    # setting the size of the image
    image_size = (180,180)
    
    img_path = 'static/images/'+image
    img = tf.keras.utils.load_img(img_path, target_size=image_size)
    img_array = tf.keras.utils.img_to_array(img)
    img_array = tf.expand_dims(img_array, 0)  # Create batch axis

    predictions = loaded_model.predict(img_array) # obtient la probabilité spam
    probability = float(predictions[0])
    probability = 100*round(probability,1)
    print(f"This image is {(100 - probability):.2f}% ham and {probability:.2f}% spam.")
    
    msg = ""
    
    if probability > 50:
        msg = "Classified as Image-SPAM with confidence level of " + str(probability) + " %" 
    else:
        msg = "Classified as Image-HAM with confidence level of " + str(100 - probability) + " %" 
    
    return (msg)





