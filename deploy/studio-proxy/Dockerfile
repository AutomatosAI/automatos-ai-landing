# The front door for studio.automatos.app. Set on the Railway service:
#   APP_UPSTREAM  = http://automotas-ai-frontend.railway.internal:3000
#   SITE_UPSTREAM = http://<studio-site service>.railway.internal:8080
FROM caddy:2-alpine
COPY Caddyfile /etc/caddy/Caddyfile
CMD ["caddy", "run", "--config", "/etc/caddy/Caddyfile", "--adapter", "caddyfile"]
