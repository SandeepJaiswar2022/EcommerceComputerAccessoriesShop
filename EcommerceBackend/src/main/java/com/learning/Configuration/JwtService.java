package com.learning.Configuration;

import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtService {

    private static final String SECRET_KEY = "hxbWbQCuyMnEXlS9gZWseO91vxQ0nfuDwRO0YttsfXI6d0/Yr6QUDx/aWuWWce7f";

    private Key getSigningKey() {
        byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public String extractUsername(String token) {
        System.out.println("\n\nGet Username\n\n");
        return extractClaim(token, Claims::getSubject);
    }

    public <T> T extractClaim(String token, Function<Claims,T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        System.out.println("\n\nExtract Claims\n\n");
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        try {
//            System.out.println("\n\nExtracting all claims from token\n\n");
            return Jwts
                    .parserBuilder()
                    .setSigningKey(getSigningKey())
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
        } catch (ExpiredJwtException e) {
            System.out.println("JWT token has been expired");
            throw e; // You can rethrow or handle the expired token here
        } catch (JwtException e) {
            System.out.println("Invalid JWT token");
            throw e; // Handle other JWT-related exceptions
        }
    }

    public String generateToken(UserDetails userDetails) {
        return generateToken(new HashMap<>(), userDetails);
    }

    public String generateToken(
            Map<String,Object> extraClaims,
            UserDetails userDetails) {
        return Jwts.builder()
                .setClaims(extraClaims)
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis()+(1000*60*60*24)))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    public Date extractExpiration(String token) {
        System.out.println("\n\nextractExpiration\n\n");
        return extractClaim(token, Claims::getExpiration);
    }

    public boolean isTokenExpired(String token) {
        System.out.println("\n\nisTokenExpired\n\n");
        return extractExpiration(token).before(new Date());
    }

    public boolean validateToken(String token, UserDetails userDetails) {
        System.out.println("\n\nvalidateToken\n\n");
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

}
