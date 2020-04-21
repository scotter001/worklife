/*
 * Copyright (c) 2018.
 * Author : Phat Thinh
 */

package vn.worklife.user.mockup.web;

public class dafaf {
   /* private List getAllWeeksByYear(int year,int numberOfWeek) {
        SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
        Calendar cal = Calendar.getInstance();
        int weeks = 52;
        if (cal.get(Calendar.YEAR) == year) {
            weeks = cal.get(Calendar.WEEK_OF_YEAR);
        }
        Date convertedDate = null;
        try {
            convertedDate = sdf.parse("01/01/"+ year);
        } catch (ParseException e) {

        }
        List patientCharts = new ArrayList();
        int count = 1;
        for(int i = 1; i <= weeks ; i++){
            WeeklyPatientChartVO patientChart = new WeeklyPatientChartVO();
            cal.setTime(convertedDate);
            cal.set(Calendar.WEEK_OF_YEAR, i);
            cal.set(Calendar.DAY_OF_WEEK, Calendar.MONDAY);
            patientChart.setStartDate(sdf.format(cal.getTime()));
            cal.add(Calendar.DATE, 6);
            patientChart.setFinishDate(sdf.format(cal.getTime()));
            patientCharts.add(patientChart);
            count++;
            if(count == numberOfWeek) {
                return patientChart;
            }
        }
        return patientCharts;
    }*/
}
