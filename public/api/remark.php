<?php
  require("db.php");
  $contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';

  if ($contentType === "application/json") {
      //Receive the RAW post data.
      $content = trim(file_get_contents("php://input"));
      $decoded = json_decode($content, true);

      // for remark we have these attributes
      $sql  = "INSERT INTO `remark`(`startTime`, `endTime`, `remark`, `eventId`, `dailycollectionnumber`)";
      $sql .= "VALUES('";
      $sql .= $decoded['collectionStart'];
      $sql .= "', '";
      $sql .= $decoded['collectionEnd'];
      $sql .= "', '";
      $sql .= $decoded['remark'];
      $sql .= "', '";
      $sql .= $decoded['eventID'];
      $sql .= "', '";
      $sql .= $decoded['dailyCollectionNumber'];
      $sql .= "')";

      echo $sql;
      // send data to db
      if ($db->query($sql)) {
      		echo "\nSUCCESS!";
      } else {
          echo "Error: " . $sql . "\n" . mysqli_error($db);
      }

      $db->close();
  }
?>
