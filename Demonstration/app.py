# Import libraries
from flask import Flask,render_template,url_for,request,redirect, make_response
import pandas as pd
import yaml
from sklearn import preprocessing
from tensorflow.keras.models import load_model
import flask
import h5py
import numpy as np
import matplotlib.pyplot as plt
from os import listdir
from os.path import isfile, join
import time
import json
from time import time
from flask import Flask, render_template, make_response
import random
from random import random

from threading import Timer
import os
import codecs

import plotly
import plotly.graph_objs as go

import joblib
import tensorflow as tf
from tensorflow.keras.models import Model,Sequential
from tensorflow.keras.layers import LSTM, Dropout,Dense, RepeatVector, TimeDistributed, Input, BatchNormalization
from tensorflow.keras.layers import Conv1D
from tensorflow.keras.layers import MaxPooling1D
from tensorflow.keras.layers import Flatten
from tensorflow.keras.callbacks import TensorBoard
from tensorflow.keras.callbacks import ModelCheckpoint
from tensorflow.keras.callbacks import LearningRateScheduler
from tensorflow.keras.optimizers import Adam as adam
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report
from sklearn.preprocessing import StandardScaler,MinMaxScaler
from tensorflow.keras.models import load_model

from scipy import stats
from scipy.signal import find_peaks
from sklearn.preprocessing import RobustScaler
from scipy import stats
from sklearn.preprocessing import OneHotEncoder

# Uncomment this line if you don't wish to see the warnings
# import warnings
# warnings.filterwarnings("ignore")

# Initialize the flask App
app = Flask(__name__)


path_to_config_file = "config.yaml"
# Helper Functions
def config_params():

    with open(path_to_config_file, "r") as ymlfile:
        cfg = yaml.safe_load(ymlfile)
    
    csv_header_acc = cfg["header_acc"]["csv_header"]
    output_column_acc = cfg["header_acc"]["output_column"]
    final_Columns_acc = cfg["header_acc"]["final_Columns"]
    final_features_acc = cfg["header_acc"]["final_features"]
    n_features_acc = cfg["header_acc"]["n_features"]
    TIME_STEP_acc = cfg["window_acc"]["TIME_STEPS"]
    STEP_acc = cfg["window_acc"]["STEP"]
    model_acc = cfg["model"]["model_acc"]

    csv_header_gyr = cfg["header_gyr"]["csv_header"]
    output_column_gyr = cfg["header_gyr"]["output_column"]
    final_Columns_gyr= cfg["header_gyr"]["final_Columns"]
    final_features_gyr = cfg["header_gyr"]["final_features"]
    n_features_gyr = cfg["header_gyr"]["n_features"]
    TIME_STEP_gyr = cfg["window_gyr"]["TIME_STEPS"]
    STEP_gyr = cfg["window_gyr"]["STEP"]
    model_gyr = cfg["model"]["model_gyr"]

    return  csv_header_acc, output_column_acc, final_Columns_acc, final_features_acc, TIME_STEP_acc, STEP_acc, model_acc, n_features_acc, csv_header_gyr, output_column_gyr, final_Columns_gyr, final_features_gyr, n_features_gyr, TIME_STEP_gyr, STEP_gyr, model_gyr, n_features_gyr


# Function to Reshape the sliced acceleration samples
def data_reshape_acc(X, y, TIME_STEP_acc, n_features_acc):

    X = X.values.reshape(1, 4, int(TIME_STEP_acc/4), n_features_acc)
    label = stats.mode(y)[0][0]
    label = label.reshape(-1,1)

    return X, label


# Function to perform one hot encoding on the output label
def encoder(y):

    enc = OneHotEncoder(handle_unknown='ignore', sparse=False)
    enc = enc.fit(y)
    y = enc.transform(y)

    return y  


# Function to preprocess and load the acceleration data
def preprocess_file_acc(data_path_acc):

    csv_header_acc, output_column_acc, final_Columns_acc, final_features_acc, TIME_STEP_acc, STEP_acc, model_acc, n_features_acc, csv_header_gyr, output_column_gyr, final_Columns_gyr, final_features_gyr, n_features_gyr, TIME_STEP_gyr, STEP_gyr, model_gyr, n_features_gyr = config_params()
    # Read the Data
    df = pd.read_csv(data_path_acc, header = None)
    df = df.rename(columns=df.iloc[0]).drop(df.index[0])
    df = df.iloc[:, 1:]
    df[output_column_acc] = pd.to_numeric(df[output_column_acc])
    df = df.apply(pd.to_numeric)
    new_cols = final_Columns_acc
    df = df[new_cols]

    y = df[output_column_acc]
    X = df.drop(output_column_acc,axis= 1)

    scale_columns = final_features_acc
    scaler = RobustScaler()
    scaler = scaler.fit(X[scale_columns])
    X.loc[:, scale_columns] = scaler.transform(X[scale_columns].to_numpy())

    return X, y


# Function to preprocess and load the gyroscope data
def preprocess_file_gyr(data_path_gyr):

    csv_header_acc, output_column_acc, final_Columns_acc, final_features_acc, TIME_STEP_acc, STEP_acc, model_acc, n_features_acc, csv_header_gyr, output_column_gyr, final_Columns_gyr, final_features_gyr, n_features_gyr, TIME_STEP_gyr, STEP_gyr, model_gyr, n_features_gyr = config_params()
    # Read the Data
    df = pd.read_csv(data_path_gyr, header = None)
    df = df.rename(columns=df.iloc[0]).drop(df.index[0])
    df = df.iloc[:, 1:]
    df[output_column_gyr] = pd.to_numeric(df[output_column_gyr])
    df = df.apply(pd.to_numeric)
    new_cols = final_Columns_gyr
    df = df[new_cols]

    y = df[output_column_gyr]
    X = df.drop(output_column_gyr,axis= 1)

    X_test = pd.read_csv("Gyr_test.csv")

    return X_test,X, y


# Function to predict the fault in acceleration data
def make_predictions_acc(X_test, y_test, model):

    csv_header_acc, output_column_acc, final_Columns_acc, final_features_acc, TIME_STEP_acc, STEP_acc, model_acc, n_features_acc, csv_header_gyr, output_column_gyr, final_Columns_gyr, final_features_gyr, n_features_gyr, TIME_STEP_gyr, STEP_gyr, model_gyr, n_features_gyr = config_params()

    new_cols = final_features_acc
    y_test = encoder(y_test)
    results = model.predict(X_test)
    results = np.argmax(results)

    return int(results)


# Function to predict the fault in gyroscope data
def make_predictions_gyr(X_test_gyr, y_test, model):

    csv_header_acc, output_column_acc, final_Columns_acc, final_features_acc, TIME_STEP_acc, STEP_acc, model_acc, n_features_acc, csv_header_gyr, output_column_gyr, final_Columns_gyr, final_features_gyr, n_features_gyr, TIME_STEP_gyr, STEP_gyr, model_gyr, n_features_gyr = config_params()
    
    X_test_scoring = X_test_gyr.values.reshape(1, -1)
    results = model.predict(X_test_scoring)

    return int(results)


counter_acc = 0
counter_gyr = 0
counter = 0

acc_list = []
gyr_list = []


@app.route('/', methods=["GET", "POST"])
def main():

    global X_acc, y_acc, X_gyr, y_gyr,X_test_gyro

    # Loading the data from csv files
    print("Loading All Data....")
    X_acc, y_acc = preprocess_file_acc("Acc_Data.csv")
    X_test_gyro, X_gyr, y_gyr = preprocess_file_gyr("Gyr_Data.csv")

    return render_template('index.html')


@app.route('/data', methods=["GET", "POST"])
def data():

    csv_header_acc, output_column_acc, final_Columns_acc, final_features_acc, TIME_STEP_acc, STEP_acc, model_acc, n_features_acc, csv_header_gyr, output_column_gyr, final_Columns_gyr, final_features_gyr, n_features_gyr, TIME_STEP_gyr, STEP_gyr, model_gyr, n_features_gyr = config_params()
    global counter_acc,counter_gyr, X_acc, y_acc, acc_list, X_gyr, y_gyr, gyr_list,X_test_gyro,counter

    model_acc = load_model(model_acc)
    model_gyr = joblib.load(model_gyr)

    # Part of Acc, where slice of data is taken
    X_temp_acc = X_acc.iloc[counter_acc: counter_acc + TIME_STEP_acc, :]
    X_test_acc, y_test_acc = data_reshape_acc(X_temp_acc, y_acc, TIME_STEP_acc, n_features_acc)
    
    try:
        acc_list = acc_list + X_temp_acc["AccX"].tolist()
    except:
        acc_list = X_temp_acc["AccX"].tolist()
    
    if len(acc_list) > (TIME_STEP_acc * 2):
        acc_list = acc_list[-TIME_STEP_acc * 2:]

    AccX_Pred= make_predictions_acc(X_test_acc, y_test_acc, model_acc)
    AccX = acc_list

    
    # Part of Gyr, where slice of data is taken
    X_temp_gyr = X_gyr.iloc[counter_gyr: counter_gyr + TIME_STEP_gyr, :]
    X_temp_gyr_temp = X_test_gyro.iloc[counter]

    X_test_gyr, y_test_gyr = X_temp_gyr, y_gyr
    
    try:
        gyr_list = gyr_list + X_temp_gyr["GyrX"].tolist()
    except:
        gyr_list = X_temp_gyr["GyrX"].tolist()
    
    if len(gyr_list) > (TIME_STEP_gyr * 2):
        gyr_list = gyr_list[-TIME_STEP_gyr * 2:]
    
    GyrX_Pred = make_predictions_gyr(X_temp_gyr_temp, y_test_gyr, model_gyr)
    GyrX = gyr_list

    # Print Prediction Results
    # print("Accleration Predictions is: ", AccX_Pred)
    # print("Gyroscope Predictions is:", GyrX_Pred)

    # Data send to frontend for visualization
    t = list(range(len(AccX)))
    data = [t, AccX_Pred, GyrX_Pred, AccX, GyrX]

    counter_acc = counter_acc + STEP_acc
    counter_gyr = counter_gyr + STEP_gyr
    counter = counter + 1

    response = make_response(json.dumps(data))
    response.content_type = 'application/json'

    return response


if __name__ == "__main__":
    app.run(debug=True)