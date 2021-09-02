## Machine Learning and Deep Learning Model Training

`All the trainings have been performed in Google Colaboratory Pro Version`

### Contents
1. **Acc_Models:** The trained CNN-LSTM model. 
   `All the other models and files can be found in the [Google Drive](https://drive.google.com/drive/folders/17LU4izLzlkPiMW9A1Au3PF5JLZlSj4ji?usp=sharing)`
2. **Acc_Test_Scripts:** Contains the test script for Accelerometer.
3. **Acc_Training_Scripts:** Contains all the model training scripts (ML + DL) for Accelerometer.
4. **Gyr_Models:** Contains the trained models for Gyroscope (Random forest model not included for size constraint).
5. **Gyr_Test_Scripts:** Contains the test script for Gyroscope.
3. **Gyr_Training_Scripts:** Contains all the model training scripts (ML + DL) for Gyroscope.

### Steps to perform Training DL Models.
`Only process for Accelerometer is shown here. For Gyroscope, follow the same process with Gyroscope data `

1. Download the data from [Here](https://drive.google.com/drive/folders/1_NTmYTuADib17Trl6Qa9ooUy4BlqG5oA?usp=sharing)
2. Run 'combineAllFiles_and_trainTestSplit.ipynb' to combine the training data.
3. Run "Acc_Training_Scripts/Acc_CNN_LSTM_5_Class_Seq2Label.ipynb" for training the Hybrid CNN-LSTM Architecture.
4. Save the model in Acc_Models
5. Run "Acc_Test_Scripts/Test_5Class_Acc_Seq2Label.ipynb" for testing the trained model with the test data.

### Obtained Test Results
![alt text](https://github.com/Niloy-Chakraborty/FDD-in-UAV-using-Deep-Learning/blob/master/ML_DL/misc_images/ConfusionMatrics.drawio.png)




 
