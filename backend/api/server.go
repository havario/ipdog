package api

import (
	"fmt"
	"net/http"
	"time"

	"github.com/jinzhu/now"
)

// 启动HTTP服务
func Run() {
	setupRoutes()

	serverAddress := ":8080"
	httpServer := &http.Server{
		Addr:         serverAddress,
		ReadTimeout:  5 * time.Second,
		WriteTimeout: 10 * time.Second,
	}

	startupTime := now.New(time.Now()).Format("2006-01-02 15:04:05")
	fmt.Printf("[%s] ipdog backend is running.\n", startupTime)

	if err := httpServer.ListenAndServe(); err != nil {
		fmt.Printf("Server failed: %v\n", err)
	}
}

// 注册路由
func setupRoutes() {
	// 健康检查接口
	http.HandleFunc("/api/ping", func(responseWriter http.ResponseWriter, request *http.Request) {
		responseWriter.Write([]byte("pong"))
	})
}
