<?php
  require("db.php");

  $contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';
  $json = '';
  $result = Array();
  if ($contentType === "application/json") {
      //Receive the RAW post data string.
      $ID = file_get_contents("php://input");

      $sql = "SELECT * FROM `vcp` ";
      $sql .= "WHERE vcp.eventId = '$ID';";
      array_push($result, $db->query($sql));
      $sql = "SELECT * FROM `sector` ";
      $sql .= "WHERE eventId = '$ID';";
      array_push($result, $db->query($sql));
      $sql = "SELECT * FROM `rhi` ";
      $sql .= "WHERE eventId = '$ID';";
      array_push($result, $db->query($sql));
      $sql = "SELECT * FROM `report` ";
      $sql .= "WHERE eventId = '$ID';";
      array_push($result, $db->query($sql));
      $sql = "SELECT * FROM `warning` ";
      $sql .= "WHERE eventId = '$ID';";
      array_push($result, $db->query($sql));
      $sql = "SELECT * FROM `remark` ";
      $sql .= "WHERE eventId = '$ID';";
      array_push($result, $db->query($sql));
      $sql = "SELECT * FROM `location` ";
      $sql .= "WHERE eventId = '$ID';";
      array_push($result, $db->query($sql));

      //$result = $db->query($sql);
      if (count($result) >0) {
          foreach($result as $row) {
            while($row_entry[] = $row->fetch_assoc()) {
                $item = $row_entry;
                $json = json_encode($item);
           }
        }
      } else {

        echo "Result is empty set.";
        echo "else possible error: " . mysqli_error($db);
      }


    }

    echo $json;

  $db->close();
?>
