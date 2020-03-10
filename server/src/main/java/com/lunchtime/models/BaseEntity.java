package com.lunchtime.models;

import javax.persistence.Column;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import lombok.Data;
import java.util.Date;

@MappedSuperclass
@Data
public class BaseEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@CreatedDate
	@Column(name = "created")
	private Data created;

	@LastModifiedDate
	@Column(name = "updated")
	private Data updated;

	@Enumerated(EnumType.STRING)
	@Column(name = "status")
	private Status status;


	public Data getCreated() {
		return created;
	}

	public void setCreated(Data created) {
		this.created = created;
	}

	public Data getUpdated() {
		return updated;
	}

	public void setUpdated(Data updated) {
		this.updated = updated;
	}

	public Status getStatus() {
		return status;
	}

	public void setStatus(Status status) {
		this.status = status;
	}

}
