FROM mcr.microsoft.com/dotnet/sdk:2.1 AS build-env
WORKDIR /app
ENV ASPNETCORE_ENVIRONMENT=Development
ENV ASPNETCORE_URLS=http://+:80
EXPOSE 5000

# Copy csproj and restore as distinct layers
COPY *.sln ./
COPY ./Corretaje/*.csproj ./Corretaje/
COPY ./Corretaje.Api/*.csproj ./Corretaje.Api/
COPY ./Corretaje.Service/*.csproj ./Corretaje.Service/
COPY ./Corretaje.Domain/*.csproj ./Corretaje.Domain/
COPY ./Corretaje.Common/*.csproj ./Corretaje.Common/
COPY ./Corretaje.Repository/*.csproj ./Corretaje.Repository/
COPY ./Corretaje.Web/*.csproj ./Corretaje.Web/
COPY ./Corretaje.Comercio/*.csproj ./Corretaje.Comercio/
COPY ./Corretaje.UnitTest/*.csproj ./Corretaje.UnitTest/
RUN dotnet restore

# Copy everything else and build
COPY . ./
RUN dotnet publish ./Corretaje.Api/Corretaje.Api.csproj -c Release -o out

# Build runtime image
FROM mcr.microsoft.com/dotnet/aspnet:2.1 
WORKDIR /app
COPY --from=build-env /app/Corretaje.Api/out/ .
RUN apt update
RUN apt install -y libgdiplus
RUN ln -s /usr/lib/libgdiplus.so /lib/x86_64-linux-gnu/libgdiplus.so
RUN apt-get install -y --no-install-recommends zlib1g fontconfig libfreetype6 libx11-6 libxext6 libxrender1 wget gdebi
RUN wget https://github.com/wkhtmltopdf/wkhtmltopdf/releases/download/0.12.5/wkhtmltox_0.12.5-1.stretch_amd64.deb
RUN gdebi --n wkhtmltox_0.12.5-1.stretch_amd64.deb
RUN apt install -y libssl1.0-dev 
RUN ln -s /usr/local/lib/libwkhtmltox.so /usr/lib/libwkhtmltox.so
ENTRYPOINT ["dotnet", "Corretaje.Api.dll"]