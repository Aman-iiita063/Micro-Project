  function fetchStudentData(rollNo) {
            const connToken = "90934521|-31949226552884547|90962446";
            const dbName = "SCHOOL_DB";
            const relName = "STUDENT_TABLE";
            const jpdbBaseURL = "http://api.login2explore.com:5577";
            const jpdbIRL = "/api/irl";

            var jsonObj = {
                rollNo: rollNo
            };

            var reqString = createGETRequest(connToken, dbName, relName, JSON.stringify(jsonObj));

            jQuery.ajaxSetup({async: false});
            var resultObj = executeCommandAtGivenBaseUrl(reqString, jpdbBaseURL, jpdbIRL);
            jQuery.ajaxSetup({async: true});

            if (resultObj.status === 200) {
                return JSON.parse(resultObj.data).record;
            }

            return null;
        }

        $("#rollNo").on('blur', function () {
            var rollNo = $("#rollNo").val();
            var student = fetchStudentData(rollNo);

            if (student) {
                $("#fullName").val(student.fullName);
                $("#class").val(student.class);
                $("#birthDate").val(student.birthDate);
                $("#address").val(student.address);
                $("#enrollmentDate").val(student.enrollmentDate);

                $("#saveBtn").prop("disabled", true);
                $("#updateBtn").prop("disabled", false);
                $("#resetBtn").prop("disabled", false);
            } else {
                resetForm();
                $("#saveBtn").prop("disabled", false);
                $("#updateBtn").prop("disabled", true);
                $("#resetBtn").prop("disabled", false);
            }
        });

        function validateAndGetFormData() {
            var rollNoVar = $("#rollNo").val();
            if (rollNoVar === "") {
                alert("Roll No is a required value.");
                $("#rollNo").focus();
                return "";
            }
            var fullNameVar = $("#fullName").val();
            if (fullNameVar === "") {
                alert("Full Name is a required value.");
                $("#fullName").focus();
                return "";
            }
            var classVar = $("#class").val();
            if (classVar === "") {
                alert("Class is a required value.");
                $("#class").focus();
                return "";
            }
            var birthDateVar = $("#birthDate").val();
            var addressVar = $("#address").val();
            var enrollmentDateVar = $("#enrollmentDate").val();
            if (birthDateVar === "" || addressVar === "" || enrollmentDateVar === "") {
                alert("All fields are required.");
                return "";
            }

            var jsonStrObj = {
                rollNo: rollNoVar,
                fullName: fullNameVar,
                class: classVar,
                birthDate: birthDateVar,
                address: addressVar,
                enrollmentDate: enrollmentDateVar
            };
            return JSON.stringify(jsonStrObj);
        }

        function createPUTRequest(connToken, jsonObj, dbName, relName) {
            var putRequest = "{\n"
                    + "\"token\" : \"" + connToken + "\","
                    + "\"dbName\": \"" + dbName + "\",\n"
                    + "\"cmd\" : \"PUT\",\n"
                    + "\"rel\" : \"" + relName + "\","
                    + "\"jsonStr\": \n" + jsonObj + "\n}";
            return putRequest;
        }

        function executeCommand(reqString, dbBaseUrl, apiEndPointUrl) {
            var url = dbBaseUrl + apiEndPointUrl;
            var jsonObj;
            $.post(url, reqString, function (result) {
                jsonObj = JSON.parse(result);
            }).fail(function (result) {
                var dataJsonObj = result.responseText;
                jsonObj = JSON.parse(dataJsonObj);
            });
            return jsonObj;
        }

        function saveStudent() {
            var jsonStr = validateAndGetFormData();
            if (jsonStr === "") {
                return;
            }
            var putReqStr = createPUTRequest("90934521|-31949226552884547|90962446", jsonStr, "SCHOOL_DB", "STUDENT_TABLE");
            alert(putReqStr);  // For testing the request string
            jQuery.ajaxSetup({async: false});
            var resultObj = executeCommand(putReqStr, "http://api.login2explore.com:5577", "/api/iml");
            alert(JSON.stringify(resultObj));
            jQuery.ajaxSetup({async: true});
            resetForm();
        }

        function updateStudent() {
            var jsonStr = validateAndGetFormData();
            if (jsonStr === "") {
                return;
            }
            alert("Student data updated: " + jsonStr);
            // Here you would update the existing record in your backend.
            resetForm();
        }

        function resetForm() {
            $("#studentForm")[0].reset();
            $("#saveBtn").prop("disabled", false);
            $("#updateBtn").prop("disabled", true);
            $("#resetBtn").prop("disabled", false);
        }
