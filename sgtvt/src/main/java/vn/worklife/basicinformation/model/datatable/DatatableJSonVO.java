/*
 * Copyright (c) 2018.
 * Author : Phat Thinh
 */

package vn.worklife.basicinformation.model.datatable;

import java.util.List;


public class DatatableJSonVO<T> {
	int start;
	int length;
	int draw;
	int recordsTotal;
	int recordsFiltered;
	List<T> data;

	public int getStart() {
		
		return start;
	}
	public void setStart(int start) {
		this.start = start;
	}
	public int getLength() {
		return length;
	}
	public void setLength(int length) {
		this.length = length;
	}
	public int getDraw() {
		return draw;
	}
	public void setDraw(int draw) {
		this.draw = draw;
	}
	public int getRecordsTotal() {
		return recordsTotal;
	}
	public void setRecordsTotal(int recordsTotal) {
		this.recordsTotal = recordsTotal;
	}
	public int getRecordsFiltered() {
		return recordsFiltered;
	}
	public void setRecordsFiltered(int recordsFiltered) {
		this.recordsFiltered = recordsFiltered;
	}
	public List<T> getData() {
		return data;
	}
	public void setData(List<T> data) {
		this.data = data;
	}
	
}
