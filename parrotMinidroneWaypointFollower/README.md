## Process to Automate Data Collection using this Model
`All the experiments and data collection is performed in MATLAB Version 2021a`

### Initial Steps
1. After cloning this repository, install all the necessary support packages.
2. Open the model in MATLAB and add all the directories and subdirectories to the PATH.
3. Double click on "ParrotMinidroneWaypointFollower.prj" and finish the initial build.

### Fault-free Data Collection
1. After build is successful, go to "parrotMinidroneWaypointFollower/Sensors Model/Sensors (Dynamics)/Sensor System/IMU_Pressure/HAL_acquisition_creator", and remove/comment all the fault injection submodules.
2. Go to dataCollection directory, and run Simulate.m file. Total 217 simulations will run and corresponding files will be created.

### Faulty Data Collection for Gyroscope
1. Go to "parrotMinidroneWaypointFollower/Sensors Model/Sensors (Dynamics)/Sensor System/IMU_Pressure/HAL_acquisition_creator", and connect Gyr Fault Injector module with Gyroscope. If Fault Injector is connected with Accelerometer, then disconnect and comment it.
2. Add the Pulse Generator with the IFlag of the Fault Injector.
3. Go to dataCollection/Gen_Fault_Gyr.m
4. Set a value in "num_wp" variable for how many waypoints to consider.
5. Set a value in "len_sim_each_wp " variable for setting how many simulations per waypoint.
6. Create "FaultyDataGyr_MATFILES" and "FaultyDataGyr" folder in the same directory, if not present.
7. Now build the model, by double clicking on "ParrotMinidroneWaypointFollower.prj".
8. Click on Run "Gen_Fault_Gyr.m"
9. Total num_wp*len_sim_each_wp simulations will be performed for each fault categories.
10. MAT files will be stored in **FaultyDataGyr_MATFILES** folder, and the txt files will be stored in **FaultyDataGyr** directory. 


### Faulty Data Collection for Accelerometer
1. Go to "parrotMinidroneWaypointFollower/Sensors Model/Sensors (Dynamics)/Sensor System/IMU_Pressure/HAL_acquisition_creator", and connect Acc Fault Injector module with Accelerometer. If Fault Injector is connected with Gyroscope, then disconnect and comment it.
2. Add the Pulse Generator with the IFlag of the Fault Injector.
3. Go to dataCollection/Gen_Fault_Acc_new.m
4. Set a value in "num_wp" variable for how many waypoints to consider.
5. Set a value in "len_sim_each_wp " variable for setting how many simulations per waypoint.
6. Create "FaultyDataAcc_MATFILES" and "FaultyDataAcc" folder in the same directory, if not present.
7. Now build the model, by double clicking on "ParrotMinidroneWaypointFollower.prj".
8. Click on Run "Gen_Fault_Acc_new.m"
9. Total num_wp*len_sim_each_wp simulations will be performed for each fault categories.
10. MAT files will be stored in **FaultyDataAcc_MATFILES** folder, and the txt files will be stored in **FaultyDataAcc** directory.

<kbd><img src="https://github.com/Niloy-Chakraborty/Fault-Detection-in-UAVs-using-Deep-Learning-and-Machine-Learning/blob/main/ML_DL/misc_images/fi_block.png" width="600" height="600"></kbd>


`A MAT file to TXT file converter "dataConvert.m" is also uploaded`

#### Sample of Collected Data
![alt text](https://github.com/Niloy-Chakraborty/FDD-in-UAV-using-Deep-Learning/blob/master/ML_DL/misc_images/DATA.png)
