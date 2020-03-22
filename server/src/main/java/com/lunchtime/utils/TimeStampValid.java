package com.lunchtime.utils;

import java.text.SimpleDateFormat;
import java.util.regex.Pattern;

public class TimeStampValid {

    public static boolean isTimeStampValid(String inputString)
    {
        SimpleDateFormat format = new java.text.SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSSSSS");
        try{
            format.parse(inputString);
            Pattern p = Pattern.compile("^\\d{4}[-]?\\d{1,2}[-]?\\d{1,2} \\d{1,2}:\\d{1,2}:\\d{1,2}[.]?\\d{1,6}$");
            return p.matcher(inputString).matches();
        }
        catch(java.text.ParseException e)
        {
            return false;
        }
    }
}
