package com.lunchtime.security.Jwt;

import java.util.Collection;
import java.util.Date;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;

public class JwtUser implements UserDetails {
	private Long id;
	private String username;
	private String password;
	private String email;
	private String avatar_photo_url;
	private Integer phone_nomber;
	private boolean enabled;
	private final Date lastPasswordResetDate;
	private final Collection<? extends GrantedAuthority> authorities;





	public JwtUser(Long id, String username, String password, String email, String avatar_photo_url,
			Integer phone_nomber, boolean enabled, Date lastPasswordResetDate,
			Collection<? extends GrantedAuthority> authorities) {

		this.id = id;
		this.username = username;
		this.password = password;
		this.email = email;
		this.avatar_photo_url = avatar_photo_url;
		this.phone_nomber = phone_nomber;
		this.enabled = enabled;
		this.lastPasswordResetDate = lastPasswordResetDate;
		this.authorities = authorities;
	}

  public JwtUser(Long id, String userName, String password, String email, String photoURL, Integer phone, boolean equals, Data updated, List<GrantedAuthority> authorities, Date lastPasswordResetDate, Collection<? extends GrantedAuthority> authorities1) {
    this.lastPasswordResetDate = lastPasswordResetDate;
    this.authorities = authorities1;
  }


  @JsonIgnore
	public Long getId() {return id;}
	@Override
	public String getUsername() {return username;}

	@JsonIgnore
	@Override
	public boolean isAccountNonExpired() {return true;}

	@JsonIgnore
	@Override
	public boolean isAccountNonLocked() {return true;}

	@JsonIgnore
	@Override
	public boolean isCredentialsNonExpired() {return true;}

	@JsonIgnore
	@Override
	public String getPassword() {
		return password;
	}


	public String getEmail() {
		return email;
	}

	public String getAvatar_photo_url() {
		return avatar_photo_url;
	}

	public Integer getPhone_nomber() {
		return phone_nomber;
	}

	@Override
	public boolean isEnabled() {
		return enabled;
	}

	@JsonIgnore
	public Date getLastPasswordResetDate() {
		return lastPasswordResetDate;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return authorities;
	}





}
