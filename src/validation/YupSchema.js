import * as Yup from "yup";

export const UserValidation = Yup.object().shape({
  firstName: Yup.string()
    .required("First Name is Required")
    .min(3, "First Name must be at least 3 characters"),
  lastName: Yup.string()
    .required("Last Name is required")
    .min(3, "Last name must be at least 3 character"),
  userName: Yup.string()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters"),
  department: Yup.string()
    .required("Department is required")
    .matches(/^[a-zA-Z\s]+$/, "Department should only contain letters"),
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email address"),
});



  export const LeaveRequestValidation = Yup.object({
    leave_type: Yup.string().required("Leave type is required"),
    start_date: Yup.date().required("Start date is required"),
    end_date: Yup.date()
      .min(Yup.ref("start_date"), "End date must be later than start date")
      .required("End date is required"),
    reason: Yup.string().required("Reason for leave is required"),
    attachment: Yup.mixed()
      .nullable()
      .test(
        "fileSize",
        "File size too large, maximum size is 10MB",
        (value) => !value || value.size <= 10485760 // 10MB
      )
      .test(
        "fileType",
        "Unsupported file type, only PDF, DOC, DOCX are allowed",
        (value) =>
          !value || ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"].includes(value.type)
      ),
  });
