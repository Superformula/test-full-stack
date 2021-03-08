# Default push logs policy
resource "aws_iam_policy" "iam_push_logs_policy" {
  name   = "${var.prefix}_iam_push_logs_policy"
  policy = file("./policies/pushLogs.json")
}