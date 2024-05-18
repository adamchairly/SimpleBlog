using System;
using System.Security.Cryptography;

public class jwtGenerator
{
    public static void Main()
    {
        var key = GenerateRandomKey();
        Console.WriteLine($"Your secret key: {key}");
    }

    public static string GenerateRandomKey()
    {
        var key = new byte[32];
        using (var generator = RandomNumberGenerator.Create())
        {
            generator.GetBytes(key);
            return Convert.ToBase64String(key);
        }
    }
}
