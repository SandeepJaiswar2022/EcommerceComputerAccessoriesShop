package com.learning.Model;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import static com.learning.Model.Permission.*;

@Getter
@RequiredArgsConstructor
public enum Role {
    USER(
            Set.of(
                    USER_CREATE,
                    USER_DELETE,
                    USER_UPDATE,
                    USER_READ
            )
    ),

    ADMIN(
            Set.of(
                    ADMIN_DELETE,
                    ADMIN_READ,
                    ADMIN_CREATE,
                    ADMIN_UPDATE,

                    USER_CREATE,
                    USER_DELETE,
                    USER_UPDATE,
                    USER_READ
            )
    );

    private final Set<Permission> permissions;

    public List<SimpleGrantedAuthority> getGrantedAuthorities() {
      var authorities = getPermissions()
                .stream()
                .map(permission -> new SimpleGrantedAuthority(permission.getPermission()))
                .collect(Collectors.toList());
        authorities.add(new SimpleGrantedAuthority("ROLE_" + this.name()));
        return authorities;
    }
}
