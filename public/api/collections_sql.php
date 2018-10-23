<?php

  //

  function locSQL($arr) {
    $locsql = "\nINSERT INTO `location`(`startTime`, `lat`, `long`, `eventId`, `dailycollectionnumber`) ";
    $locsql .= "VALUES('";
    $locsql .= $arr['collectionStart'];
    $locsql .= "', '" ;
    $locsql .= $arr['locationLat'];
    $locsql .= "', '";
    $locsql .= $arr['locationLong'];
    $locsql .= "', '";
    $locsql .= $arr['eventID'];
    $locsql .= "', '";
    $locsql .= $arr['dailyCollectionNumber'];
    $locsql .="');";

    return $locsql;
  }

  function remarkSQL($arr) {
    $remarksql  = "\nINSERT INTO `remark`(`startTime`, `endTime`, `remark`, `eventId`, `dailycollectionnumber`) ";
    $remarksql .= "VALUES('";
    $remarksql .= $arr['collectionStart'];
    $remarksql .= "', '";
    $remarksql .= $arr['collectionEnd'];
    $remarksql .= "', '";
    $remarksql .= $arr['remark'];
    $remarksql .= "', '";
    $remarksql .= $arr['eventID'];
    $remarksql .= "', '";
    $remarksql .= $arr['dailyCollectionNumber'];
    $remarksql .= "');";

    return $remarksql;
  }

  function reportSQL($arr) {
    $reportsql  = "\nINSERT INTO `report`(`startTime`, `endTime`, `reportText`, `eventId`, `dailycollectionnumber`) ";
    $reportsql .= "VALUES('";
    $reportsql .= $arr['collectionStart'];
    $reportsql .= "', '";
    $reportsql .= $arr['collectionEnd'];
    $reportsql .= "', '";
    $reportsql .= $arr['reportText'];
    $reportsql .= "', '";
    $reportsql .= $arr['eventID'];
    $reportsql .= "', '";
    $reportsql .= $arr['dailyCollectionNumber'];
    $reportsql .= "');";

    return $reportsql;
  }

  function warningSQL($arr) {
    $warningsql  = "\nINSERT INTO `warning`(`startTime`, `endTime`, `warningType`, `warningCounties`, `warningText`, `eventId`, `dailycollectionnumber`) ";
    $warningsql .= "VALUES('";
    $warningsql .= $arr['collectionStart'];
    $warningsql .= "', '";
    $warningsql .= $arr['collectionEnd'];
    $warningsql .=  "', '";
    $warningsql .= $arr['warningType'];
    $warningsql .= "', '";
    $warningsql .= $arr['warningCounties'];
    $warningsql .=  "', '";
    $warningsql .= $arr['warningText'];
    $warningsql .=  "', '";
    $warningsql .= $arr['eventID'];
    $warningsql .=  "', '";
    $warningsql .= $arr['dailyCollectionNumber'];
    $warningsql .= "');";

    return $warningsql;
  }

  function rhiSQL($arr) {
    $rhisql  = "\nINSERT INTO `rhi`(`startTime`, `endTime`, `topEdge`, `bottomEdge`, `azimuth`, `remarks`,`eventId`, `dailycollectionnumber`) ";
    $rhisql .= "VALUES('";
    $rhisql .= $arr['collectionStart'];
    $rhisql .= "', '";
    $rhisql .= $arr['collectionEnd'];
    $rhisql .=  "', '";
    $rhisql .= $arr['rhiEnd'];
    $rhisql .= "', '";
    $rhisql .= $arr['rhiStart'];
    $rhisql .=  "', '";
    $rhisql .= $arr['azimuth'];
    $rhisql .=  "', '";
    $rhisql .= $arr['rhiRemark'];
    $rhisql .=  "', '";
    $rhisql .= $arr['eventID'];
    $rhisql .=  "', '";
    $rhisql .= $arr['dailyCollectionNumber'];
    $rhisql .= "');";

    return $rhisql;
  }

  function sectorSQL($arr) {
    $sectorsql  = "\nINSERT INTO `sector`(`startTime`, `endTime`, `leftEdge`, `rightEdge`, `eventId`, `dailycollectionnumber`) ";
    $sectorsql .= "VALUES('";
    $sectorsql .= $arr['collectionStart'];
    $sectorsql .= "', '";
    $sectorsql .= $arr['collectionEnd'];
    $sectorsql .=  "', '";
    $sectorsql .= $arr['sectorStart'];
    $sectorsql .= "', '";
    $sectorsql .= $arr['sectorEnd'];
    $sectorsql .=  "', '";
    $sectorsql .= $arr['eventID'];
    $sectorsql .=  "', '";
    $sectorsql .= $arr['dailyCollectionNumber'];
    $sectorsql .= "');";

    return $sectorsql;
  }

  function vcpSQL($arr) {
    $vcpsql  = "\nINSERT INTO `vcp`(`startTime`, `endTime`, `vcp`, `eventId`, `dailycollectionnumber`) ";
    $vcpsql .= "VALUES('";
    $vcpsql .= $arr['collectionStart'];
    $vcpsql .= "', '";
    $vcpsql .= $arr['collectionEnd'];
    $vcpsql .= "', '";
    $vcpsql .= $arr['VCP'];
    $vcpsql .= "', '";
    $vcpsql .= $arr['eventID'];
    $vcpsql .= "', '";
    $vcpsql .= $arr['dailyCollectionNumber'];
    $vcpsql .= "');";

    return $vcpsql;
  }

?>
