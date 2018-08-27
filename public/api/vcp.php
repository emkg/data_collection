<?php
  require("db.php");
  $contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';

  if ($contentType === "application/json") {
      //Receive the RAW post data.
      $content = trim(file_get_contents("php://input"));
      $decoded = json_decode($content, true);

      // for vcp we have these attributes
      $sql  = "INSERT INTO `VCP`(`startTime`, `endTime`, `vcp`, `collectionID`)";
      $sql .= "VALUES('" . $decoded['collectionStart'] "', '" . $decoded['collectionStart'];
      $sql .= "', '" . $decoded['vcp'] . "', '" . $decoded['collectionID']. "')";

      echo $sql;
      // send data to db
      if ($db->query($sql)) {
      		echo "\nSUCCESS!";
      } else {
          echo "Error: " . $sql . "<br>" . mysqli_error($db);
      }

      $db->close();
  }
?>
