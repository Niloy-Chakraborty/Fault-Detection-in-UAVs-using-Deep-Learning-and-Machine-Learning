## Process to Automate Data Collection using this Model
`All the experiments and data collection is performed in MATLAB Version 2021a`

### Initial Steps
1. After cloning this repository, install all the necessary support packages.
2. Open the model in MATLAB and add all the directories and subdirectories to the PATH.
3. Double click on "ParrotMinidroneWaypointFollower.prj" and finish the initial build.

### Fault-free Data Collection
1. After build is successful, go to ////, and remove/comment all the fault injection submodule.
2. Go to dataCollection directory, and run Simulate.m file. Total 217 simulations will run and corresponding files will be created.

### Faulty Data Collection for Gyroscope
1. Go to ////, and connect Fault Injector module with Gyroscope. If Fault Injector is connected with Accelerometer, then remove it.
2. Go to dataCollection/Gen_Fault_Gyr.m
3. Set a value in "num_wp" variable for how many waypoints to consider.
4. Set a value in "len_sim_each_wp " variable for setting how many simulations per waypoint.
5. Create "FaultyDataGyr_MATFILES" and "FaultyDataGyr" folder in the same directory, if not present.
6. Now build the model, by double clicking on "ParrotMinidroneWaypointFollower.prj".
7. Click on Run "Gen_Fault_Gyr.m"
8. Total num_wp*len_sim_each_wp simulations will be performed for each fault categories.
9. MAT files will be stored in **FaultyDataGyr_MATFILES** folder, and the txt files will be stored in **FaultyDataGyr** directory. 


### Faulty Data Collection for Accelerometer
1. Go to ////, and connect Fault Injector module with Accelerometer. If Fault Injector is connected with Gyroscope, then remove it.
2. Go to dataCollection/Gen_Fault_Acc_new.m
3. Set a value in "num_wp" variable for how many waypoints to consider.
4. Set a value in "len_sim_each_wp " variable for setting how many simulations per waypoint.
5. Create "FaultyDataAcc_MATFILES" and "FaultyDataAcc" folder in the same directory, if not present.
6. Now build the model, by double clicking on "ParrotMinidroneWaypointFollower.prj".
7. Click on Run "Gen_Fault_Acc_new.m"
8. Total num_wp*len_sim_each_wp simulations will be performed for each fault categories.
9. MAT files will be stored in **FaultyDataAcc_MATFILES** folder, and the txt files will be stored in **FaultyDataAcc** directory.

#### Sample of Collected Data
![alt text](https://github.com/Niloy-Chakraborty/FDD-in-UAV-using-Deep-Learning/blob/master/ML_DL/misc_images/DATA.png)
