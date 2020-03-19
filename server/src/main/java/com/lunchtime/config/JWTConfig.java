package com.lunchtime.config;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;


import javax.sql.DataSource;
import java.util.Arrays;
import java.util.List;

//@Configuration
//@EnableAuthorizationServer
public class JWTConfig {//extends AuthorizationServerConfigurerAdapter {
//
//    @Autowired
//    @Qualifier("userDetailsService")
//    private UserDetailsService userDetailsService;

//    @Override
//    @Bean
//    public AuthenticationManager authenticationManagerBean() throws Exception {
//        return super.authenticationManagerBean();
//    }


//    private AuthenticationManager authenticationManager;
//
//    @Value("${varun.oauth.tokenTimeout:3600}")
//    private int expiration;
//
//    @Autowired
//    private DataSource dataSource;
//
//    @Autowired
//    private JwtAccessTokenConverter accessTokenConverter;
//
//
//    private String signingKey;
//
//    @Autowired
//    private TokenStore tokenStore;
//
//
//    @Bean
//    public PasswordEncoder passwordEncoder() {
//        return new BCryptPasswordEncoder();
//    }
//
//    @Bean
//    public TokenStore tokenStore() {
//        return new JwtTokenStore(accessTokenConverter());
//    }
//
//    @Bean
//    public JwtAccessTokenConverter accessTokenConverter() {
//        JwtAccessTokenConverter converter = new JwtAccessTokenConverter();
//        converter.setSigningKey("jwttok");
//        return converter;
//    }
//
//    @Override
//    public void configure(AuthorizationServerEndpointsConfigurer configurer) throws Exception {
//
//        TokenEnhancerChain enhancerChain = new TokenEnhancerChain();
//        List list= Arrays.asList(accessTokenConverter);
//        enhancerChain.setTokenEnhancers(list);
//
//
//        configurer.tokenStore(tokenStore)
//            .accessTokenConverter(accessTokenConverter)
//            .tokenEnhancer(enhancerChain);
//        configurer.authenticationManager(authenticationManager);
//        configurer.userDetailsService(userDetailsService);
//    }
//
//    @Override
//    public void configure(ClientDetailsServiceConfigurer clients) throws Exception {
//
//        clients.inMemory().withClient("varun").secret("secret").accessTokenValiditySeconds(expiration)
//            .scopes("read", "write").authorizedGrantTypes("password", "refresh_token").resourceIds("resource");
//
//
//    }
//    @Override
//    protected void configure(AuthenticationManagerBuilder auth) throws Exception
//    {
//        auth.parentAuthenticationManager(authenticationManagerBean());
//        .userDetailsService(customUserDetailsService);
//    }


}
