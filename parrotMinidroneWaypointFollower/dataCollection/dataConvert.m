


% Fault_Category = 1
myFolder = 'C:\Users\kashy\Documents\MATLAB\Master_Thesis\model\DATA\FaultyDataAcc_MATFILES_V1\4_Package_Drop';
filePattern = fullfile(myFolder, '*.mat');
matFiles = dir(filePattern);
for k = 1:length(matFiles)
  baseFileName = matFiles(k).name;
  fullFileName = fullfile(myFolder, baseFileName);
  fprintf(1, 'Now reading %s\n', fullFileName);
  matData(k) = load(fullFileName);
  arr = matData(k).ts_name_pd.Data;
  filenametxt = strcat("FaultyDataAcc_V1\4_Package_Drop\",baseFileName(1:end - mod(numel(baseFileName),4)),'.txt');
% 
  writematrix(arr,filenametxt);
  clear arr
end