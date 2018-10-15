<?php
  require("db.php");

  $contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';
  $json = '';
  if ($contentType === "application/json") {
      //Receive the RAW post data.
      // Getting the received JSON into $json variable.
      //$content = trim(file_get_contents("php://input"));
      $ID = file_get_contents("php://input");
      // decoding the received JSON and store into $obj variable.
      //$obj= json_decode($content, true);
      // Populate ID from JSON $obj array and store into $ID.
      //$ID = $obj['eventID'];

      //Fetching the selected record.
      $sql = "SELECT * from location, remark, report, rhi, sector, vcp, warning ";
      $sql .= "WHERE location.eventId = '$ID' OR remark.eventId = '$ID' OR report.eventId = '$ID' ";
      $sql .= "OR rhi.eventId = '$ID' ";
      $sql .= "OR sector.eventId = '$ID' ";
      $sql .= "OR vcp.eventId = '$ID' ";
      $sql .= "OR warning.eventId = '$ID';";

      $result = $db->query($sql);
      if ($result->num_rows >0) {
          while($row[] = $result->fetch_assoc()) {
          $item = $row;
          $json = json_encode($item);
        }

      } else {

        echo "Result is empty set.";
        echo "else possible error: " . mysqli_error($db);
      }


    }

    echo $json;

  $db->close();
?>
