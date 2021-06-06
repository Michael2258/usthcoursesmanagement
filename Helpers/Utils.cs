namespace coursesmanagement.Helpers
{
    public static class Utils
    {
        public static bool CheckEmptyStrings(string[] strings)
        {
            foreach (var s in strings)
            {
                if (string.IsNullOrWhiteSpace(s)) return false;
            }

            return true;
        }
    }
}