package com.app.security;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.app.security.filters.JWTRequestFilter;

@EnableWebSecurity
@Configuration
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig {

	@Autowired
	private JWTRequestFilter filter;

	// method to assign permissions for every user
	@Bean
	public SecurityFilterChain authorizeRequests(HttpSecurity httpSecurity) throws Exception {

		httpSecurity.cors().and().csrf().disable().exceptionHandling()
				.authenticationEntryPoint((request, response, ex) -> {
					response.sendError(HttpServletResponse.SC_UNAUTHORIZED, ex.getMessage());
				})

				.and()
				.authorizeRequests()
				.antMatchers("/admins").hasRole("ADMIN")
				.antMatchers("/customers/**").permitAll()//hasRole("CUSTOMER")
				.antMatchers("/vendors/**","/tiffins/**").permitAll()//hasRole("VENDOR")
				.antMatchers("/home", "/orders/**","/auth/**", "/swagger*/**", "/v*/api-docs/**","/subscription/**","/customerplan/**").permitAll()
				.antMatchers(HttpMethod.OPTIONS).permitAll().anyRequest().authenticated()

				.and().sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)

				.and().addFilterBefore(filter, UsernamePasswordAuthenticationFilter.class);

		return httpSecurity.build();

	}

	@Bean
	public PasswordEncoder getPasswordEncoder() {
		return new BCryptPasswordEncoder();
	}

	// configure auth mgr bean : to be used in Authentication REST controller
	@Bean
	public AuthenticationManager authenticatonMgr(AuthenticationConfiguration config) throws Exception {
		return config.getAuthenticationManager();
	}

}
