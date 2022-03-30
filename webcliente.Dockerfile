FROM mcr.microsoft.com/dotnet/sdk:2.1 AS build-env
WORKDIR /app
ENV ASPNETCORE_ENVIRONMENT=Development
ENV ASPNETCORE_URLS=http://+:80
EXPOSE 5000

RUN apt-get -qq update && apt-get -qqy --no-install-recommends install wget gnupg \
    git \
    unzip

RUN apt-get update
RUN apt-get upgrade ca-certificates -y
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash -
RUN apt-get install -y nodejs

RUN npm install -g yarn
# Copy csproj and restore as distinct layers
COPY *.sln ./
COPY ./Corretaje/*.csproj ./Corretaje/
COPY ./Corretaje.Api/*.csproj ./Corretaje.Api/
COPY ./Corretaje.Service/*.csproj ./Corretaje.Service/
COPY ./Corretaje.Domain/*.csproj ./Corretaje.Domain/
COPY ./Corretaje.Common/*.csproj ./Corretaje.Common/
COPY ./Corretaje.Repository/*.csproj ./Corretaje.Repository/
COPY ./Corretaje.Web/*.csproj ./Corretaje.Web/
COPY ./Corretaje.UnitTest/*.csproj ./Corretaje.UnitTest/
RUN dotnet restore

# Copy everything else and build
COPY . ./
COPY . /app
RUN dotnet publish ./Corretaje.Web/Corretaje.Web.csproj -c Release -o out

# Build runtime image
FROM mcr.microsoft.com/dotnet/aspnet:2.1
WORKDIR /app
COPY --from=build-env /app/Corretaje.Web/out/ .
ENTRYPOINT ["dotnet", "Corretaje.Web.dll"]