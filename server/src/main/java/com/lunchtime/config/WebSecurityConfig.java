package com.lunchtime.config;


import com.lunchtime.security.JwtAuthenticationTokenFilter;
import com.lunchtime.service.MyUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;


//@EnableGlobalMethodSecurity(prePostEnabled = true)
@EnableWebSecurity
//@Configuration
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
    //
//
//    @Autowired
//    private JwtAuthenticationProvider authenticationProvider;
//    @Autowired
//    private JwtAuthenticationEntryPoint entryPoint;
//
//    @Bean
//    public AuthenticationManager authenticationManager() {
//        return new ProviderManager(Collections.singletonList(authenticationProvider));
//    }
//
//    @Bean
//    public JwtAuthenticationTokenFilter authenticationTokenFilter() {
//        JwtAuthenticationTokenFilter filter = new JwtAuthenticationTokenFilter();
//        filter.setAuthenticationManager(authenticationManager());
//        filter.setAuthenticationSuccessHandler(new JwtSuccessHandler());
//        return filter;
//    }
//
//    @Override
//    public void configure(AuthenticationManagerBuilder auth) throws Exception {
//        auth.authenticationProvider(authenticationProvider);
//    }
//
//    @Override
//    public void configure(HttpSecurity http) throws Exception {
//
//        http.csrf().disable()
//            .authorizeRequests().antMatchers("**/api/**").authenticated()
//            .and()
//            .exceptionHandling().authenticationEntryPoint(entryPoint)
//            .and()
//            .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
//
//        http.addFilterBefore(authenticationTokenFilter(), UsernamePasswordAuthenticationFilter.class);
//        http.headers().cacheControl();
//
//    }


    @Autowired
    private UserDetailsService myUserDetailsService;
    @Autowired
    private JwtAuthenticationTokenFilter jwtAuthenticationTokenFilter;

    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(myUserDetailsService);
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return NoOpPasswordEncoder.getInstance();
    }

    @Override
    @Bean
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Override
    protected void configure(HttpSecurity httpSecurity) throws Exception {
        httpSecurity.csrf().disable()
            .authorizeRequests().antMatchers("/authenticate").permitAll().
            anyRequest().authenticated().and().
            exceptionHandling().and().sessionManagement()
            .sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        httpSecurity.addFilterBefore(jwtAuthenticationTokenFilter, UsernamePasswordAuthenticationFilter.class);

    }


}






